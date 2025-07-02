import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CrashConfigDto,
  CrashResultDto,
  CrashProvablyFairDto,
  CrashProvablyFairRequestDto,
  StartCrashDto,
  CrashConfigRequestDto,
  CashoutCrashGameDto,
} from "ez-utils";
import { CrashRound } from "../../../entities/crash-round.entity";
import { createHmac, createHash, randomBytes } from "crypto";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class CrashService implements OnModuleInit {
  private logger = getLoggerConfig(CrashService.name);
  constructor(
    @InjectRepository(CrashRound)
    private readonly crashRepo: Repository<CrashRound>,
  ) {
    this.logger.debug(
      `${CrashService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  private nextNonce = 0;
  private activeRounds: Map<string, NodeJS.Timeout> = new Map();
  private readonly HOUSE_EDGE = 0.01;
  private readonly MAX_MULTIPLIER = 1_000_000;

  async onModuleInit() {
    this.logger.debug(
      `Initializing module`,
      "",
      "onModuleInit",
      LogStreamLevel.DebugLight,
    );
    try {
      const [last] = await this.crashRepo.find({
        order: { nonce: "DESC" },
        take: 1,
      });
      this.nextNonce = last ? last.nonce + 1 : 0;
      this.logger.info(
        `Next nonce set to ${this.nextNonce}`,
        "",
        "onModuleInit",
        LogStreamLevel.DebugLight,
      );
    } catch (error: any) {
      this.logger.error(
        `Error during module init: ${error.message}`,
        "",
        "onModuleInit",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
  }

  async startRound(
    startCrashDto: StartCrashDto,
    traceId: string,
  ): Promise<CrashResultDto> {
    this.logger.debug(
      `Starting round with ${JSON.stringify(startCrashDto)}`,
      traceId,
      "startRound",
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(16).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");
    const crashPoint = this.computeCrashPoint(
      serverSeed,
      startCrashDto.clientSeed,
      this.nextNonce,
    );
    const round = this.crashRepo.create({
      serverSeed,
      serverSeedHash,
      clientSeed: startCrashDto.clientSeed,
      nonce: this.nextNonce,
      crashPoint,
      wager: startCrashDto.wager,
      cashoutAt: startCrashDto.cashoutAt,
      variant: startCrashDto.variant,
      multiplier: 0,
      payout: 0,
      isFinished: false,
    });
    this.nextNonce += 1;
    try {
      await this.crashRepo.save(round);
      this.logger.info(
        `Round ${round.gameId} created`,
        traceId,
        "startRound",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Failed to save round: ${error.message}`,
        traceId,
        "startRound",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    const duration = startCrashDto.variant === "turbo" ? 3000 : 5000;
    const timer = setTimeout(async () => {
      await this.finalizeRound(round.gameId);
    }, duration);
    this.activeRounds.set(round.gameId, timer);

    return {
      gameId: round.gameId,
      crashPoint: 0,
      multiplier: 0,
      payout: 0,
      serverSeedHash: round.serverSeedHash,
    };
  }

  async getConfig(
    crashConfigRequestDto: CrashConfigRequestDto,
    traceId: string,
  ): Promise<CrashConfigDto> {
    this.logger.debug(
      `Getting config`,
      traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return {
      minBet: 0.0001,
      maxBet: 10,
      cashoutRange: [1, 1000000],
      multiplierTable: [1, 1.02, 1.05, 1.1, 1.2],
      roundIntervalMs: 5000,
      variants: { classic: true, turbo: true },
    };
  }

  async getProvablyFair(
    crashProvablyFairRequestDto: CrashProvablyFairRequestDto,
    traceId: string,
  ): Promise<CrashProvablyFairDto> {
    this.logger.debug(
      `Fetching provably fair data for ${crashProvablyFairRequestDto.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let round: CrashRound | null = null;
    try {
      round = await this.crashRepo.findOne({
        where: { gameId: crashProvablyFairRequestDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching round: ${error.message}`,
        traceId,
        "getProvablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!round) throw new NotFoundException("Round not found");
    this.logger.info(
      `Provably fair data returned for ${round.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: round.serverSeedHash,
      serverSeed: round.serverSeed,
      clientSeed: round.clientSeed,
      nonce: round.nonce,
    };
  }

  async cashout(
    cashoutCrashGameDto: CashoutCrashGameDto,
    traceId: string,
  ): Promise<CrashResultDto> {
    const gameId = cashoutCrashGameDto.gameId;
    this.logger.debug(
      `Cashout request with ${JSON.stringify(cashoutCrashGameDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let round: CrashRound | null = null;
    try {
      round = await this.crashRepo.findOne({ where: { gameId } });
    } catch (error: any) {
      this.logger.error(
        `Error fetching round: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!round) throw new NotFoundException("Round not found");
    if (round.isFinished) {
      return {
        gameId: round.gameId,
        crashPoint: round.crashPoint,
        multiplier: round.multiplier,
        payout: round.payout,
        serverSeedHash: round.serverSeedHash,
      };
    }
    const timer = this.activeRounds.get(gameId);
    if (timer) {
      clearTimeout(timer);
      this.activeRounds.delete(gameId);
    }

    const won = round.crashPoint >= round.cashoutAt;
    round.multiplier = won ? round.cashoutAt : 0;
    round.payout = won ? round.wager * round.cashoutAt : 0;
    round.isFinished = true;
    try {
      await this.crashRepo.save(round);
      this.logger.info(
        `Round ${round.gameId} cashed out`,
        traceId,
        "cashout",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving round: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    return {
      gameId: round.gameId,
      crashPoint: round.crashPoint,
      multiplier: round.multiplier,
      payout: round.payout,
      serverSeedHash: round.serverSeedHash,
    };
  }

  private async finalizeRound(gameId: string) {
    this.logger.debug(
      `Finalizing round ${gameId}`,
      "",
      "finalizeRound",
      LogStreamLevel.DebugLight,
    );
    let round: CrashRound | null = null;
    try {
      round = await this.crashRepo.findOne({ where: { gameId } });
    } catch (error: any) {
      this.logger.error(
        `Error fetching round for finalize: ${error.message}`,
        "",
        "finalizeRound",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!round || round.isFinished) return;
    const won = round.crashPoint >= round.cashoutAt;
    round.multiplier = won ? round.cashoutAt : 0;
    round.payout = won ? round.wager * round.cashoutAt : 0;
    round.isFinished = true;
    try {
      await this.crashRepo.save(round);
      this.logger.info(
        `Round ${gameId} finalized`,
        "",
        "finalizeRound",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error finalizing round: ${error.message}`,
        "",
        "finalizeRound",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    this.activeRounds.delete(gameId);
  }

  private computeCrashPoint(
    serverSeed: string,
    clientSeed: string,
    nonce: number,
  ): number {
    const h = createHmac("sha256", serverSeed)
      .update(`${clientSeed}:${nonce}`)
      .digest();
    const int = h.readUInt32BE(0);
    const r = int / 0xffffffff;
    const m = (1 - this.HOUSE_EDGE) / r;
    const result = Math.min(this.MAX_MULTIPLIER, m);
    return parseFloat(result.toFixed(2));
  }
}
