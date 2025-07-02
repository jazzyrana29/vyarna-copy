import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomBytes, createHash, createHmac } from "crypto";
import {
  StartFlipDto,
  StartFlipResponse,
  FlipDto,
  FlipResponse,
  CashoutResponse,
  FlipConfig,
  FlipConfigRequestDto,
  FlipProvablyFairDto,
  FlipResult,
  FlipChoice,
  FlipCashoutDto,
  FlipProvablyFairRequestDto,
  FlipVariant,
} from "ez-utils";
import { FlipSession } from "../../../entities/flip-session.entity";
import { FlipRound } from "../../../entities/flip-round.entity";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class FlipService {
  private logger = getLoggerConfig(FlipService.name);
  // streak is effectively unlimited; multiplier growth is capped via config
  private deadlines = new Map<string, number>();

  private config: FlipConfig = {
    minBet: 0.0001,
    maxBet: 10,
    houseEdge: 0.02,
    maxMultiplier: 1027604.48,
    multiplierCurve: [],
    streakBoostMilestones: [5, 10, 20],
    streakBoostBonusRates: [1.1, 1.2, 1.5],
    timedChallengeDurationSec: 5,
    timedChallengeBonusRate: 1.1,
  };

  constructor(
    @InjectRepository(FlipSession)
    private readonly sessionRepo: Repository<FlipSession>,
    @InjectRepository(FlipRound)
    private readonly roundRepo: Repository<FlipRound>,
  ) {
    this.logger.debug(
      `${FlipService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
    // multiplier curve no longer used; kept for compatibility
  }

  private async processFlip(
    session: FlipSession,
    choice: FlipChoice,
  ): Promise<FlipResponse> {
    this.logger.debug(
      `Processing flip for ${session.sessionId}`,
      "",
      "processFlip",
      LogStreamLevel.DebugLight,
    );
    let lastRound: FlipRound | null = null;
    try {
      lastRound = await this.roundRepo.findOne({
        where: { sessionId: session.sessionId },
        order: { nonce: "DESC" },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching last round: ${error.message}`,
        "",
        "processFlip",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    const nonce = lastRound ? lastRound.nonce + 1 : 1;
    const hmac = createHmac("sha256", session.serverSeed);
    hmac.update(`${session.clientSeed}:${nonce}`);
    const hash = hmac.digest("hex");
    const isHeads = parseInt(hash.slice(0, 8), 16) % 2 === 0;
    const result = isHeads ? FlipChoice.Heads : FlipChoice.Tails;

    const round = this.roundRepo.create({
      sessionId: session.sessionId,
      nonce,
      choice,
      result,
    });
    try {
      await this.roundRepo.save(round);
    } catch (error: any) {
      this.logger.error(
        `Error saving round: ${error.message}`,
        "",
        "processFlip",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    if (round.choice === round.result) {
      session.streak += 1;

      const climb = 1 + 0.01 * session.streak;
      let roundMult = (1 / 0.5) * (1 - this.config.houseEdge) * climb;
      if (session.variant === FlipVariant.StreakBoost) {
        this.config.streakBoostMilestones.forEach((ms, idx) => {
          if (session.streak >= ms) {
            roundMult *= this.config.streakBoostBonusRates[idx];
          }
        });
      }

      if (session.variant === FlipVariant.TimedChallenge) {
        const deadline = this.deadlines.get(session.sessionId);
        if (deadline && Date.now() <= deadline) {
          roundMult *= this.config.timedChallengeBonusRate;
        }
        this.deadlines.set(
          session.sessionId,
          Date.now() + this.config.timedChallengeDurationSec * 1000,
        );
      }

      session.multiplier = Math.min(
        session.multiplier * roundMult,
        this.config.maxMultiplier,
      );
    } else {
      session.isFinished = true;
      session.multiplier = 1;
    }

    try {
      await this.sessionRepo.save(session);
    } catch (error: any) {
      this.logger.error(
        `Error saving session: ${error.message}`,
        "",
        "processFlip",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    return {
      result: round.choice === round.result ? FlipResult.Win : FlipResult.Loss,
      multiplier: session.multiplier,
      streak: session.streak,
      gameOver: session.isFinished,
    };
  }

  async startSession(
    startFlipDto: StartFlipDto,
    traceId: string,
  ): Promise<StartFlipResponse> {
    this.logger.debug(
      `Starting flip session with ${JSON.stringify(startFlipDto)}`,
      traceId,
      "startSession",
      LogStreamLevel.DebugLight,
    );
    if (
      startFlipDto.wager < this.config.minBet ||
      startFlipDto.wager > this.config.maxBet
    ) {
      throw new BadRequestException("Wager out of allowed range");
    }
    const serverSeed = randomBytes(32).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");

    const session = this.sessionRepo.create({
      serverSeed,
      serverSeedHash,
      clientSeed: startFlipDto.clientSeed || randomBytes(16).toString("hex"),
      variant: startFlipDto.variant,
      wager: startFlipDto.wager,
      streak: 0,
      multiplier: 1,
    });
    try {
      await this.sessionRepo.save(session);
      this.logger.info(
        `Session ${session.sessionId} started`,
        traceId,
        "startSession",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving session: ${error.message}`,
        traceId,
        "startSession",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    const firstFlip = await this.processFlip(session, startFlipDto.choice);

    return {
      sessionId: session.sessionId,
      serverSeedHash: session.serverSeedHash,
      config: this.config,
      firstFlip,
    };
  }

  async flip(flipDto: FlipDto, traceId: string): Promise<FlipResponse> {
    const sessionId = flipDto.sessionId;
    this.logger.debug(
      `Flip request with ${JSON.stringify(flipDto)}`,
      traceId,
      "flip",
      LogStreamLevel.DebugLight,
    );
    let session: FlipSession | null = null;
    try {
      session = await this.sessionRepo.findOne({ where: { sessionId } });
    } catch (error: any) {
      this.logger.error(
        `Error fetching session: ${error.message}`,
        traceId,
        "flip",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!session || session.isFinished) {
      throw new NotFoundException("Session not found");
    }

    return await this.processFlip(session, flipDto.choice);
  }

  async cashout(
    flipCashoutDto: FlipCashoutDto,
    traceId: string,
  ): Promise<CashoutResponse> {
    const sessionId = flipCashoutDto.sessionId;
    this.logger.debug(
      `Cashout with ${JSON.stringify(flipCashoutDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let session: FlipSession | null = null;
    try {
      session = await this.sessionRepo.findOne({ where: { sessionId } });
    } catch (error: any) {
      this.logger.error(
        `Error fetching session: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!session || session.isFinished) {
      throw new NotFoundException("Session not found");
    }

    session.isFinished = true;
    this.deadlines.delete(sessionId);
    try {
      await this.sessionRepo.save(session);
      this.logger.info(
        `Session ${session.sessionId} cashed out`,
        traceId,
        "cashout",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving session: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    return {
      payout: session.wager * Number(session.multiplier),
      multiplier: Number(session.multiplier),
    };
  }

  async getConfig(
    flipConfigRequestDto: FlipConfigRequestDto,
    traceId: string,
  ): Promise<FlipConfig> {
    this.logger.debug(
      "Fetching config",
      traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return this.config;
  }

  async getProvablyFair(
    flipProvablyFairRequestDto: FlipProvablyFairRequestDto,
    traceId: string,
  ): Promise<FlipProvablyFairDto> {
    const sessionId = flipProvablyFairRequestDto.sessionId;
    this.logger.debug(
      `Provably fair request for ${sessionId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let session: FlipSession | null = null;
    try {
      session = await this.sessionRepo.findOne({ where: { sessionId } });
    } catch (error: any) {
      this.logger.error(
        `Error fetching session: ${error.message}`,
        traceId,
        "getProvablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!session) throw new NotFoundException("Session not found");
    let rounds: FlipRound[] = [];
    try {
      rounds = await this.roundRepo.find({
        where: { sessionId },
        order: { nonce: "ASC" },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching rounds: ${error.message}`,
        traceId,
        "getProvablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    this.logger.info(
      `Provably fair data returned for ${session.sessionId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );

    return {
      serverSeedHash: session.serverSeedHash,
      serverSeed: session.serverSeed,
      clientSeed: session.clientSeed,
      nonces: rounds.map((r) => r.nonce),
    };
  }
}
