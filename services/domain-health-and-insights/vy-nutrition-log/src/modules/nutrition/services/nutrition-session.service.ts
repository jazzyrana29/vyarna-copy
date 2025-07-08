import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionSession } from '../../../entities/nutrition_session.entity';
import { BreastEvent } from '../../../entities/breast_event.entity';
import { BottleEvent } from '../../../entities/bottle_event.entity';
import { SolidsEvent } from '../../../entities/solids_event.entity';
import { PumpingEvent } from '../../../entities/pumping_event.entity';
import { SessionSummary } from '../../../entities/session_summary.entity';
import { ZtrackingSessionSummary } from '../../../entities/ztracking_session_summary.entity';
import {
  StartNutritionSessionDto,
  NutritionSessionDto,
  GetNutritionSessionDto,
  GetZtrackingNutritionSessionDto,
  LogNutritionEventDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingNutritionSessionService } from './ztracking-nutrition-session.service';
import { ZtrackingNutritionSession } from '../../../entities/ztracking_nutrition_session.entity';
import {
  computeBottleIntake,
  computeBreastSwitchCount,
  computeDurationSecs,
  computeEventsCount,
  computeSolidsSummary,
  computeTotalPumped,
} from './nutrition-summary.utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  encodeKafkaMessage,
  KT_NUTRITION_SESSION_CREATED,
  KT_NUTRITION_EVENT_LOGGED,
  KT_NUTRITION_SESSION_ENDED,
} from 'ez-utils';

@Injectable()
export class NutritionSessionService {
  private logger = getLoggerConfig(NutritionSessionService.name);

  constructor(
    @InjectRepository(NutritionSession)
    private readonly nutritionSessionRepo: Repository<NutritionSession>,
    @InjectRepository(BreastEvent)
    private readonly breastRepo: Repository<BreastEvent>,
    @InjectRepository(BottleEvent)
    private readonly bottleRepo: Repository<BottleEvent>,
    @InjectRepository(SolidsEvent)
    private readonly solidsRepo: Repository<SolidsEvent>,
    @InjectRepository(PumpingEvent)
    private readonly pumpingRepo: Repository<PumpingEvent>,
    @InjectRepository(SessionSummary)
    private readonly summaryRepo: Repository<SessionSummary>,
    @InjectRepository(ZtrackingSessionSummary)
    private readonly ztrackingSummaryRepo: Repository<ZtrackingSessionSummary>,
    private readonly ztrackingService: ZtrackingNutritionSessionService,
  ) {
    this.logger.debug(
      `${NutritionSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startNutritionSession(
    startNutritionSessionDto: StartNutritionSessionDto,
    traceId: string,
  ): Promise<NutritionSessionDto> {
    const entity = this.nutritionSessionRepo.create({
      ...startNutritionSessionDto,
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    });
    await this.nutritionSessionRepo.save(entity);
    await this.ztrackingService.createZtrackingNutritionSessionEntity(
      entity,
      traceId,
    );
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_NUTRITION_SESSION_CREATED,
      encodeKafkaMessage(NutritionSessionService.name, {
        sessionId: entity.sessionId,
        milkGiverId: entity.milkGiverId,
        babyId: entity.babyId,
        type: entity.type,
        startedAt: entity.startedAt,
        traceId,
      }),
    );
    this.logger.info(
      'Nutrition session created',
      traceId,
      'startNutritionSession',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getNutritionSession(
    getNutritionSessionDto: GetNutritionSessionDto,
    traceId: string,
  ): Promise<NutritionSessionDto | null> {
    const { sessionId } = getNutritionSessionDto;
    const session = await this.nutritionSessionRepo.findOne({
      where: { sessionId },
    });

    this.logger.info(
      session
        ? `Nutrition session found with ID: ${sessionId}`
        : `No Nutrition session found with ID: ${sessionId}`,
      traceId,
      'getNutritionSession',
      LogStreamLevel.ProdStandard,
    );

    return session;
  }

  async getZtrackingNutritionSession(
    getDto: GetZtrackingNutritionSessionDto,
    traceId: string,
  ): Promise<ZtrackingNutritionSession[]> {
    return this.ztrackingService.findZtrackingNutritionSessionEntity(
      getDto,
      traceId,
    );
  }

  async logEvent(
    dto: LogNutritionEventDto,
    traceId: string,
  ): Promise<any> {
    const { sessionId, eventType, payload } = dto;
    const session = await this.nutritionSessionRepo.findOne({ where: { sessionId } });
    if (!session) {
      throw new Error(`Nutrition session not found => ${sessionId}`);
    }
    if (session.status === 'COMPLETED') {
      throw new Error(`Cannot log events for completed session => ${sessionId}`);
    }

    let repo: Repository<any> | null = null;
    switch (eventType) {
      case 'BREAST':
        repo = this.breastRepo;
        break;
      case 'BOTTLE':
        repo = this.bottleRepo;
        break;
      case 'SOLIDS':
        repo = this.solidsRepo;
        break;
      case 'PUMPING':
        repo = this.pumpingRepo;
        break;
      default:
        throw new Error(`Unknown nutrition event type => ${eventType}`);
    }

    const entity = await repo.save(repo.create({ sessionId, ...payload }));

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_NUTRITION_EVENT_LOGGED,
      encodeKafkaMessage(NutritionSessionService.name, {
        sessionId,
        eventId: entity.eventId,
        eventType,
        eventTime: entity.eventTime,
        traceId,
      }),
    );

    this.logger.info(
      `Nutrition event logged for session ${sessionId}`,
      traceId,
      'logEvent',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async endSession(sessionId: string, traceId: string): Promise<SessionSummary> {
    const session = await this.nutritionSessionRepo.findOne({ where: { sessionId } });
    if (!session) {
      throw new Error(`Nutrition session not found => ${sessionId}`);
    }

    if (session.status === 'COMPLETED') {
      const existing = await this.summaryRepo.findOne({ where: { sessionId } });
      if (existing) return existing;
    }

    session.status = 'COMPLETED';
    session.endedAt = new Date();
    await this.nutritionSessionRepo.save(session);

    const [breastEvents, bottleEvents, solidsEvents, pumpingEvents] = await Promise.all([
      this.breastRepo.find({ where: { sessionId } }),
      this.bottleRepo.find({ where: { sessionId } }),
      this.solidsRepo.find({ where: { sessionId } }),
      this.pumpingRepo.find({ where: { sessionId } }),
    ]);

    const summary = this.summaryRepo.create({
      sessionId,
      durationSecs: computeDurationSecs(session.startedAt, session.endedAt),
      breastIntakeMl: undefined,
      bottleFormulaIntakeMl: computeBottleIntake(bottleEvents, 'FORMULA'),
      bottleBreastmilkIntakeMl: computeBottleIntake(bottleEvents, 'BREASTMILK'),
      bottleMixedIntakeMl: computeBottleIntake(bottleEvents, 'MIXED'),
      solidsSummary: computeSolidsSummary(solidsEvents),
      totalPumpedMl: computeTotalPumped(pumpingEvents),
      breastSwitchCount: computeBreastSwitchCount(breastEvents),
      eventsCount: computeEventsCount(
        breastEvents,
        bottleEvents,
        solidsEvents,
        pumpingEvents,
      ),
    });

    await this.summaryRepo.save(summary);
    await this.ztrackingSummaryRepo.save(
      this.ztrackingSummaryRepo.create({ ...summary, versionDate: new Date() }),
    );

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_NUTRITION_SESSION_ENDED,
      encodeKafkaMessage(NutritionSessionService.name, {
        sessionId,
        summary,
        traceId,
      }),
    );

    this.logger.info(
      `Nutrition session ended ${sessionId}`,
      traceId,
      'endSession',
      LogStreamLevel.ProdStandard,
    );

    return summary;
  }
}
