import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PumpGame } from "../../../entities/pump-game.entity";
import {
  StartPumpDto,
  PumpDto,
  PumpCashoutDto,
  PumpConfigRequestDto,
  PumpProvablyFairRequestDto,
  StartPumpResponseDto,
  PumpResponseDto,
  CashoutPumpDto,
  PumpConfigDto,
  ProvablyFairPumpDto,
  PumpAutoBetSettingsDto,
  PumpAutoBetResultDto,
} from "ez-utils";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import { createHmac, createHash, randomBytes } from "crypto";
import { RNGService } from "./rng.service";
import { PayoutService } from "./payout.service";

@Injectable()
export class PumpService {
  private logger = getLoggerConfig(PumpService.name);
  constructor(
    @InjectRepository(PumpGame)
    private readonly pumpRepo: Repository<PumpGame>,
    private readonly rngService: RNGService,
    private readonly payoutService: PayoutService,
  ) {
    this.logger.debug(
      `${PumpService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  private readonly config: PumpConfigDto = {
    riskLevels: ["easy", "medium", "hard", "expert"],
    multiplierCurves: {
      easy: [1.05, 1.1, 1.2, 1.3, 1.4],
      medium: [1.03, 1.06, 1.12, 1.25, 1.4],
      hard: [1.02, 1.04, 1.08, 1.16, 1.32],
      expert: [1.01, 1.02, 1.05, 1.1, 1.2],
    },
    stabilizerChance: 0.05,
  };

  async startGame(
    startPumpDto: StartPumpDto,
    traceId: string,
  ): Promise<StartPumpResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(startPumpDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(16).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");
    const clientSeed =
      startPumpDto.clientSeed || randomBytes(8).toString("hex");

    const seedForRng = `${serverSeed}:${clientSeed}`;
    const popThreshold = this.rngService.generatePopThreshold(
      startPumpDto.riskLevel,
      seedForRng,
    );

    const game = this.pumpRepo.create({
      serverSeed,
      serverSeedHash,
      clientSeed,
      wager: startPumpDto.wager,
      riskLevel: startPumpDto.riskLevel,
      variant: startPumpDto.variant,
      pumpsDone: 0,
      burst: false,
      nonceMap: [],
      popThreshold,
    });
    try {
      await this.pumpRepo.save(game);
      this.logger.info(
        `Game ${game.roundId} started`,
        traceId,
        "startGame",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "startGame",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    return {
      roundId: game.roundId,
      serverSeedHash: game.serverSeedHash,
      riskLevel: game.riskLevel,
      config: { maxPumps: 100 },
    };
  }

  async pump(pumpDto: PumpDto, traceId: string): Promise<PumpResponseDto> {
    this.logger.debug(
      `Pump request with ${JSON.stringify(pumpDto)}`,
      traceId,
      "pump",
      LogStreamLevel.DebugLight,
    );
    let game: PumpGame | null = null;
    try {
      game = await this.pumpRepo.findOne({
        where: { roundId: pumpDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "pump",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) throw new NotFoundException("Game not found");
    if (game.burst)
      return {
        burst: game.burst,
        multiplier: this.payoutService.calculateMultiplier(
          game.pumpsDone,
          game.riskLevel,
        ),
        pumpsDone: game.pumpsDone,
      };
    const nonce = game.pumpsDone + 1;
    game.pumpsDone = nonce;
    game.nonceMap.push(String(nonce));

    const hmac = createHmac("sha256", game.serverSeed)
      .update(`${game.clientSeed || ""}:${nonce}`)
      .digest();
    const threshold = game.popThreshold;
    const multiplier = this.payoutService.calculateMultiplier(
      game.pumpsDone,
      game.riskLevel,
    );
    let burst = multiplier >= threshold;
    if (burst && game.variant === "safeInflate") {
      const safeRand = hmac.readUInt32BE(4) / 0xffffffff;
      if (safeRand < this.config.stabilizerChance) burst = false;
    }

    game.burst = burst;
    try {
      await this.pumpRepo.save(game);
      this.logger.info(
        `Pump saved for ${game.roundId}`,
        traceId,
        "pump",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "pump",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    return {
      burst: game.burst,
      multiplier: this.payoutService.calculateMultiplier(
        game.pumpsDone,
        game.riskLevel,
      ),
      pumpsDone: game.pumpsDone,
    };
  }

  async cashout(
    pumpCashoutDto: PumpCashoutDto,
    traceId: string,
  ): Promise<CashoutPumpDto> {
    this.logger.debug(
      `Cashout with ${JSON.stringify(pumpCashoutDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let game: PumpGame | null = null;
    try {
      game = await this.pumpRepo.findOne({
        where: { roundId: pumpCashoutDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) throw new NotFoundException("Game not found");
    game.burst = true;
    try {
      await this.pumpRepo.save(game);
      this.logger.info(
        `Game ${game.roundId} cashed out`,
        traceId,
        "cashout",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    const multiplier = this.payoutService.calculateMultiplier(
      game.pumpsDone,
      game.riskLevel,
    );
    return {
      payout: this.payoutService.computePayout(game.wager, multiplier),
      multiplier,
      pumpsDone: game.pumpsDone,
    };
  }

  async getConfig(
    pumpConfigRequestDto: PumpConfigRequestDto,
    traceId: string,
  ): Promise<PumpConfigDto> {
    this.logger.debug(
      "Fetching config",
      traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return this.config;
  }

  async getProvablyFair(
    pumpProvablyFairRequestDto: PumpProvablyFairRequestDto,
    traceId: string,
  ): Promise<ProvablyFairPumpDto> {
    this.logger.debug(
      `Provably fair request with ${JSON.stringify(pumpProvablyFairRequestDto)}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let game: PumpGame | null = null;
    try {
      game = await this.pumpRepo.findOne({
        where: { roundId: pumpProvablyFairRequestDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "getProvablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) throw new NotFoundException("Game not found");
    this.logger.info(
      `Provably fair data returned for ${game.roundId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed || "",
      nonceMap: game.nonceMap || [],
    };
  }

  async autoBet(
    pumpAutoBetSettingsDto: PumpAutoBetSettingsDto,
    traceId: string,
  ): Promise<PumpAutoBetResultDto> {
    let profit = 0;
    let roundsPlayed = 0;
    for (let i = 0; i < pumpAutoBetSettingsDto.rounds; i++) {
      const start = await this.startGame(
        {
          wager: pumpAutoBetSettingsDto.wager,
          riskLevel: pumpAutoBetSettingsDto.riskLevel,
        },
        traceId,
      );
      let burst = false;
      const pumps = pumpAutoBetSettingsDto.pumpsPerRound ?? 0;
      for (let j = 0; j < pumps; j++) {
        const res = await this.pump(
          { gameId: start.roundId, tileIndex: 0 },
          traceId,
        );
        if (res.burst) {
          burst = true;
          break;
        }
      }
      let roundProfit = -pumpAutoBetSettingsDto.wager;
      if (!burst) {
        const cash = await this.cashout({ gameId: start.roundId }, traceId);
        roundProfit = cash.payout - pumpAutoBetSettingsDto.wager;
      }
      profit += roundProfit;
      roundsPlayed++;
      if (
        pumpAutoBetSettingsDto.profitTarget &&
        profit >= pumpAutoBetSettingsDto.profitTarget
      )
        break;
      if (
        pumpAutoBetSettingsDto.lossLimit &&
        -profit >= pumpAutoBetSettingsDto.lossLimit
      )
        break;
    }
    return { rounds: roundsPlayed, profit: parseFloat(profit.toFixed(2)) };
  }
}
