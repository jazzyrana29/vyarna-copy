import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepRating } from '../../../entities/sleep_rating.entity';
import { ZtrackingSleepRatingService } from './ztracking-sleep-rating.service';
import {
  SleepRatingDto,
  GetSleepRatingsDto,
  DeleteSleepRatingDto,
  encodeKafkaMessage,
  KT_RATE_SLEEP,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepRatingService {
  private logger = getLoggerConfig(SleepRatingService.name);

  constructor(
    @InjectRepository(SleepRating)
    private readonly ratingRepo: Repository<SleepRating>,
    private readonly ztrackingService: ZtrackingSleepRatingService,
  ) {
    this.logger.debug(
      `${SleepRatingService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createRating(
    sleepRatingDto: SleepRatingDto,
    traceId: string,
  ): Promise<SleepRatingDto> {
    const entity = await this.ratingRepo.save(
      this.ratingRepo.create(sleepRatingDto),
    );
    await this.ztrackingService.createZtrackingForSleepRating(entity, traceId);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_RATE_SLEEP,
      encodeKafkaMessage(SleepRatingService.name, {
        ratingId: entity.ratingId,
        sessionId: entity.sessionId,
        ratingType: entity.ratingType,
        ratingValue: entity.ratingValue,
        traceId,
      }),
    );
    return entity;
  }

  async getRatings(
    getSleepRatingsDto: GetSleepRatingsDto,
    traceId: string,
  ): Promise<SleepRatingDto[]> {
    const { sessionId } = getSleepRatingsDto;
    const list = await this.ratingRepo.find({ where: { sessionId } });
    this.logger.info(
      `Retrieved ${list.length} ratings`,
      traceId,
      'getRatings',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deleteRating(
    deleteSleepRatingDto: DeleteSleepRatingDto,
    traceId: string,
  ): Promise<void> {
    const { ratingId } = deleteSleepRatingDto;
    const entity = await this.ratingRepo.findOne({ where: { ratingId } });
    if (!entity) {
      throw new NotFoundException(`No rating found => ${ratingId}`);
    }
    await this.ratingRepo.softDelete(ratingId);
    entity.deletedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepRating(entity, traceId);
  }
}
