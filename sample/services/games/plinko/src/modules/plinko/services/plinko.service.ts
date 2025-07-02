import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "../../../utils/common";
import {
  CashoutPlinkoDto,
  DropPlinkoDto,
  StartPlinkoDto,
  PlinkoConfigRequestDto,
  PlinkoProvablyFairRequestDto,
  PlinkoProvablyFairDto,
  StartPlinkoResponseDto,
  DropPlinkoResponseDto,
  CashoutPlinkoResponseDto,
  PlinkoConfigDto,
} from "ez-utils";
import { randomBytes, createHash, createHmac } from "crypto";
import { PlinkoGame } from "../../../entities/plinko-game.entity";

@Injectable()
export class PlinkoService {
  private logger = getLoggerConfig(PlinkoService.name);

  private readonly HOUSE_EDGE = 0.01;

  private readonly payoutRanges = {
    low: {
      8: { min: 0.5, max: 5.6 },
      9: { min: 0.7, max: 5.6 },
      10: { min: 0.5, max: 8.9 },
      11: { min: 0.7, max: 8.4 },
      12: { min: 0.5, max: 10 },
      13: { min: 0.7, max: 8.1 },
      14: { min: 0.5, max: 7.1 },
      15: { min: 0.7, max: 15 },
      16: { min: 0.5, max: 16 },
    },
    medium: {
      8: { min: 0.4, max: 13 },
      9: { min: 0.5, max: 18 },
      10: { min: 0.4, max: 22 },
      11: { min: 0.5, max: 24 },
      12: { min: 0.3, max: 33 },
      13: { min: 0.4, max: 43 },
      14: { min: 0.2, max: 58 },
      15: { min: 0.3, max: 88 },
      16: { min: 0.3, max: 110 },
    },
    high: {
      8: { min: 0.2, max: 29 },
      9: { min: 0.2, max: 43 },
      10: { min: 0.2, max: 76 },
      11: { min: 0.2, max: 120 },
      12: { min: 0.2, max: 170 },
      13: { min: 0.2, max: 260 },
      14: { min: 0.2, max: 420 },
      15: { min: 0.2, max: 620 },
      16: { min: 0.2, max: 1000 },
    },
  } as const;

  private getMultiplierTable(rows: number, risk: string): number[] {
    const range = (this.payoutRanges as any)[risk]?.[rows];
    if (!range) return Array(rows + 1).fill(1);
    const center = rows / 2;
    const table: number[] = [];
    for (let i = 0; i <= rows; i++) {
      const dist = Math.abs(i - center);
      const t = dist / center;
      const mult = range.min + (range.max - range.min) * t;
      table[i] = parseFloat(mult.toFixed(2));
    }
    return table;
  }

  constructor(
    @InjectRepository(PlinkoGame)
    private readonly plinkoRepo: Repository<PlinkoGame>,
  ) {
    this.logger.debug(
      `${PlinkoService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(
    startPlinkoDto: StartPlinkoDto,
    traceId: string,
  ): Promise<StartPlinkoResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(startPlinkoDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(16).toString("hex");
    const clientSeed =
      startPlinkoDto.clientSeed || randomBytes(8).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");

    const game = this.plinkoRepo.create({
      serverSeed,
      serverSeedHash,
      clientSeed,
      wager: startPlinkoDto.wager,
      rows: startPlinkoDto.rows,
      riskLevel: startPlinkoDto.riskLevel,
      variant: startPlinkoDto.variant,
      path: [],
      isCompleted: false,
      shieldActive: false,
    });
    try {
      await this.plinkoRepo.save(game);
      this.logger.info(
        `Game ${game.gameId} started`,
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
    return { gameId: game.gameId, serverSeedHash } as StartPlinkoResponseDto;
  }

  async drop(
    dropPlinkoDto: DropPlinkoDto,
    traceId: string,
  ): Promise<DropPlinkoResponseDto> {
    this.logger.debug(
      `Drop with ${JSON.stringify(dropPlinkoDto)}`,
      traceId,
      "drop",
      LogStreamLevel.DebugLight,
    );
    let game: PlinkoGame | null = null;
    try {
      game = await this.plinkoRepo.findOne({
        where: { gameId: dropPlinkoDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "drop",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game || game.isCompleted)
      return {
        slot: 0,
        multiplier: 0,
        path: [],
        proof: "",
      } as DropPlinkoResponseDto;

    const nonce = dropPlinkoDto.dropIndex;
    const proof = createHmac("sha256", game.serverSeed)
      .update(`${game.clientSeed}:${nonce}`)
      .digest("hex");
    let position = 0;
    const path: string[] = [];
    for (let i = 0; i < game.rows; i++) {
      const byte = parseInt(proof.slice(i * 2, i * 2 + 2), 16);
      const moveRight = byte % 2 === 0;
      path.push(moveRight ? "R" : "L");
      if (moveRight) position += 1;
    }

    const table = this.getMultiplierTable(game.rows, game.riskLevel);
    let multiplier = table[position] ?? 1;

    if (game.variant === "edgeRush") {
      const prev = game.path.length ? game.path[game.path.length - 1] : null;
      if (
        prev !== null &&
        (prev === 0 || prev === game.rows) &&
        (position === 0 || position === game.rows)
      ) {
        multiplier *= 2;
      }
    }

    if (game.variant === "centerGuard") {
      if (game.shieldActive && multiplier < 1) {
        multiplier = 1 - (1 - multiplier) / 2;
        game.shieldActive = false;
      }
      const centers =
        game.rows % 2 === 0
          ? [game.rows / 2]
          : [Math.floor(game.rows / 2), Math.ceil(game.rows / 2)];
      if (centers.includes(position)) {
        game.shieldActive = true;
      }
    }

    game.path.push(position);
    try {
      await this.plinkoRepo.save(game);
      this.logger.info(
        `Drop recorded for ${game.gameId}`,
        traceId,
        "drop",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "drop",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    return { slot: position, multiplier, path, proof } as DropPlinkoResponseDto;
  }

  async getConfig(
    plinkoConfigRequestDto: PlinkoConfigRequestDto,
    traceId: string,
  ): Promise<PlinkoConfigDto> {
    return {
      rows: { min: 8, max: 16, default: 12 },
      riskLevels: ["low", "medium", "high"],
    } as PlinkoConfigDto;
  }

  async cashout(
    cashoutPlinkoDto: CashoutPlinkoDto,
    traceId: string,
  ): Promise<CashoutPlinkoResponseDto> {
    this.logger.debug(
      `Cashout with ${JSON.stringify(cashoutPlinkoDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let game: PlinkoGame | null = null;
    try {
      game = await this.plinkoRepo.findOne({
        where: { gameId: cashoutPlinkoDto.gameId },
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
    if (!game) return { payout: 0 } as CashoutPlinkoResponseDto;
    game.isCompleted = true;
    const lastSlot = game.path.length ? game.path[game.path.length - 1] : 0;
    const table = this.getMultiplierTable(game.rows, game.riskLevel);
    const multiplier = table[lastSlot] ?? 1;
    try {
      await this.plinkoRepo.save(game);
      this.logger.info(
        `Game ${game.gameId} cashed out`,
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
    const payout = game.wager * multiplier * (1 - this.HOUSE_EDGE);
    return { payout } as CashoutPlinkoResponseDto;
  }

  async provablyFair(
    plinkoProvablyFairRequestDto: PlinkoProvablyFairRequestDto,
    traceId: string,
  ): Promise<PlinkoProvablyFairDto> {
    this.logger.debug(
      `Provably fair request with ${JSON.stringify(plinkoProvablyFairRequestDto)}`,
      traceId,
      "provablyFair",
      LogStreamLevel.DebugLight,
    );
    let game: PlinkoGame | null = null;
    try {
      game = await this.plinkoRepo.findOne({
        where: { gameId: plinkoProvablyFairRequestDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "provablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game)
      return {
        serverSeedHash: "",
        serverSeed: "",
        clientSeed: "",
        nonce: 0,
      } as PlinkoProvablyFairDto;
    this.logger.info(
      `Provably fair data returned for ${game.gameId}`,
      traceId,
      "provablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed || "",
      nonce: game.path.length,
    } as PlinkoProvablyFairDto;
  }
}
