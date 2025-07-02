import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DiceGame } from "../../../entities/dice-game.entity";
import {
  StartDiceGameDto,
  StartDiceGameResponseDto,
  RollDiceDto,
  CashoutDiceGameDto,
  DiceConfigDto,
  DiceConfigRequestDto,
  DiceProvablyFairDto,
  DiceProvablyFairRequestDto,
  RollResultDto,
  AutoBetSettingsDto,
  AutoBetResultDto,
  AutoBetStrategy,
} from "ez-utils";
import { randomBytes, createHash, createHmac } from "crypto";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class DiceService {
  private logger = getLoggerConfig(DiceService.name);
  constructor(
    @InjectRepository(DiceGame)
    private readonly diceRepo: Repository<DiceGame>,
  ) {
    this.logger.debug(
      `${DiceService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  private readonly config: DiceConfigDto = {
    minBet: 0.0001,
    maxBet: 100,
    houseEdge: 0.01,
    multiplierCurve: [1.0102, 1.2375, 2, 4.95],
  };

  private computeMultiplier(target: number, rollOver: boolean): number {
    const winChance = rollOver ? 100 - target : target;
    const multiplier = (100 / winChance) * (1 - this.config.houseEdge);
    return parseFloat(multiplier.toFixed(2));
  }

  async startGame(
    startDiceGameDto: StartDiceGameDto,
    traceId: string,
  ): Promise<StartDiceGameResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(startDiceGameDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(16).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");
    const clientSeed =
      startDiceGameDto.clientSeed || randomBytes(8).toString("hex");

    const game = this.diceRepo.create({
      serverSeed,
      serverSeedHash,
      clientSeed,
      wager: startDiceGameDto.wager,
      nonce: 0,
      isFinished: false,
    });
    try {
      const saved = await this.diceRepo.save(game);
      this.logger.info(
        `Game ${saved.sessionId} created`,
        traceId,
        "startGame",
        LogStreamLevel.ProdStandard,
      );
      return {
        sessionId: saved.sessionId,
        serverSeedHash: saved.serverSeedHash,
      };
    } catch (error: any) {
      this.logger.error(
        `Error starting game: ${error.message}`,
        traceId,
        "startGame",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
  }

  async roll(
    rollDiceDto: RollDiceDto,
    traceId: string,
  ): Promise<RollResultDto> {
    this.logger.debug(
      `Roll with ${JSON.stringify(rollDiceDto)}`,
      traceId,
      "roll",
      LogStreamLevel.DebugLight,
    );
    let game: DiceGame | null = null;
    try {
      game = await this.diceRepo.findOne({
        where: { sessionId: rollDiceDto.sessionId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "roll",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) throw new NotFoundException("Game not found");
    if (game.isFinished) {
      return {
        sessionId: game.sessionId,
        roll: game.lastRoll ?? 0,
        target: game.target ?? rollDiceDto.target,
        rollOver: game.rollOver ?? rollDiceDto.rollOver,
        isFinished: game.isFinished,
        multiplier: game.multiplier ?? 0,
        payout: game.payout ?? 0,
        serverSeedHash: game.serverSeedHash,
      };
    }

    if (rollDiceDto.target < 2 || rollDiceDto.target > 98) {
      throw new BadRequestException("Target must be between 2 and 98");
    }

    const hash = createHmac("sha256", game.serverSeed)
      .update(`${game.clientSeed || ""}:${game.nonce}`)
      .digest();
    const intVal = hash.readUInt32BE(0);
    const roll = parseFloat(((intVal % 10000) / 100).toFixed(2));

    game.nonce += 1;
    game.lastRoll = roll;
    game.target = rollDiceDto.target;
    game.rollOver = rollDiceDto.rollOver;

    const multiplier = this.computeMultiplier(
      rollDiceDto.target,
      rollDiceDto.rollOver,
    );
    game.multiplier = multiplier;
    let payout = 0;

    if (
      (rollDiceDto.rollOver && roll > rollDiceDto.target) ||
      (!rollDiceDto.rollOver && roll < rollDiceDto.target)
    ) {
      game.isFinished = true;
      payout = game.wager * multiplier;
    }
    game.payout = payout;

    try {
      await this.diceRepo.save(game);
      this.logger.info(
        `Game ${game.sessionId} rolled`,
        traceId,
        "roll",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving roll: ${error.message}`,
        traceId,
        "roll",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    return {
      sessionId: game.sessionId,
      roll,
      target: rollDiceDto.target,
      rollOver: rollDiceDto.rollOver,
      isFinished: game.isFinished,
      multiplier,
      payout,
      serverSeedHash: game.serverSeedHash,
    };
  }

  async cashout(
    cashoutDiceGameDto: CashoutDiceGameDto,
    traceId: string,
  ): Promise<RollResultDto> {
    this.logger.debug(
      `Cashout with ${JSON.stringify(cashoutDiceGameDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let game: DiceGame | null = null;
    try {
      game = await this.diceRepo.findOne({
        where: { sessionId: cashoutDiceGameDto.sessionId },
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
    game.isFinished = true;
    try {
      await this.diceRepo.save(game);
      this.logger.info(
        `Game ${game.sessionId} cashed out`,
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
    return {
      sessionId: game.sessionId,
      roll: game.lastRoll ?? 0,
      target: game.target ?? 0,
      rollOver: game.rollOver ?? true,
      isFinished: true,
      multiplier: game.multiplier ?? 0,
      payout: game.payout ?? 0,
      serverSeedHash: game.serverSeedHash,
    };
  }

  async getConfig(
    diceConfigRequestDto: DiceConfigRequestDto,
    traceId: string,
  ): Promise<DiceConfigDto> {
    this.logger.debug(
      "Fetching config",
      traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return this.config;
  }

  async getProvablyFair(
    diceProvablyFairRequestDto: DiceProvablyFairRequestDto,
    traceId: string,
  ): Promise<DiceProvablyFairDto> {
    this.logger.debug(
      `Provably fair for ${diceProvablyFairRequestDto.sessionId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let game: DiceGame | null = null;
    try {
      game = await this.diceRepo.findOne({
        where: { sessionId: diceProvablyFairRequestDto.sessionId },
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
    if (!game.isFinished)
      throw new BadRequestException("Game not finished yet");
    this.logger.info(
      `Provably fair data returned for ${game.sessionId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed,
      nonce: game.nonce,
    };
  }

  async autoBet(
    autoBetSettingsDto: AutoBetSettingsDto,
    traceId: string,
  ): Promise<AutoBetResultDto> {
    let wager = autoBetSettingsDto.initialBet;
    let profit = 0;
    let rolls = 0;
    let consecutiveLosses = 0;
    const strategy =
      autoBetSettingsDto.strategy ||
      (autoBetSettingsDto.martingale
        ? AutoBetStrategy.MARTINGALE
        : AutoBetStrategy.MANUAL);

    const adjustOnWin = (bet: number): number => {
      switch (strategy) {
        case AutoBetStrategy.MARTINGALE:
          return autoBetSettingsDto.initialBet;
        case AutoBetStrategy.PAROLI:
          return bet * (1 + autoBetSettingsDto.onWinPct / 100);
        case AutoBetStrategy.DALEM:
          return (
            bet + autoBetSettingsDto.onWinPct * autoBetSettingsDto.initialBet
          );
        default:
          return bet;
      }
    };

    const adjustOnLoss = (bet: number): number => {
      switch (strategy) {
        case AutoBetStrategy.MARTINGALE:
          return bet * (1 + autoBetSettingsDto.onLossPct / 100);
        case AutoBetStrategy.DELAYED_MARTINGALE:
          return consecutiveLosses >= 3
            ? bet * (1 + autoBetSettingsDto.onLossPct / 100)
            : bet;
        case AutoBetStrategy.DALEM:
          return Math.max(
            autoBetSettingsDto.initialBet,
            bet - autoBetSettingsDto.onLossPct * autoBetSettingsDto.initialBet,
          );
        default:
          return bet;
      }
    };

    for (let i = 0; i < autoBetSettingsDto.totalRolls; i++) {
      const start = await this.startGame({ wager }, traceId);
      const roll = await this.roll(
        {
          sessionId: start.sessionId,
          target: autoBetSettingsDto.target,
          rollOver: autoBetSettingsDto.rollOver,
        },
        traceId,
      );
      rolls++;
      profit += roll.payout - wager;

      if (roll.isFinished && roll.payout > 0) {
        consecutiveLosses = 0;
        wager = adjustOnWin(wager);
      } else {
        consecutiveLosses += 1;
        wager = adjustOnLoss(wager);
      }
      if (
        profit >= autoBetSettingsDto.stopOnProfit ||
        -profit >= autoBetSettingsDto.stopOnLoss
      )
        break;
    }

    return { rolls, profit: parseFloat(profit.toFixed(2)) };
  }
}
