import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createHash, createHmac, randomBytes } from "crypto";
import {
  DragonTowerStartGameDto,
  DragonTowerStartGameResponseDto,
  DragonTowerRevealTileDto,
  DragonTowerRevealTileResponseDto,
  DragonTowerCashoutDto,
  DragonTowerCashoutResponseDto,
  DragonTowerGameConfigDto,
  DragonTowerConfigRequestDto,
  DragonTowerProvablyFairRequestDto,
  DragonTowerProvablyFairDto,
} from "ez-utils";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import { DragonTowerGame } from "../../../entities/dragon-tower-game.entity";

@Injectable()
export class DragonTowerService {
  private logger = getLoggerConfig(DragonTowerService.name);

  private computeEggPositions(
    serverSeed: string,
    clientSeed: string,
    nonce: number,
    columns: number,
    eggs: number,
  ): number[] {
    const result: number[] = [];
    let iter = 0;
    while (result.length < eggs) {
      const hmac = createHmac("sha256", serverSeed)
        .update(`${clientSeed}:${nonce}:${iter}`)
        .digest("hex");
      const idx = parseInt(hmac.slice(0, 8), 16) % columns;
      if (!result.includes(idx)) result.push(idx);
      iter++;
    }
    return result;
  }

  private getMultiplier(difficulty: string, level: number): number {
    const table = this.config.multiplierTable[difficulty] || [];
    if (level <= 0) return 1;
    return table[level - 1] || table[table.length - 1] || 1;
  }

  constructor(
    @InjectRepository(DragonTowerGame)
    private readonly gamesRepo: Repository<DragonTowerGame>,
  ) {
    this.logger.debug(
      `${DragonTowerService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
    this.config = this.buildConfig();
  }

  private buildConfig(): DragonTowerGameConfigDto {
    const levels = [
      { difficulty: "easy", tiles: 4, eggs: 3 },
      { difficulty: "medium", tiles: 3, eggs: 2 },
      { difficulty: "hard", tiles: 2, eggs: 1 },
      { difficulty: "expert", tiles: 3, eggs: 1 },
      { difficulty: "master", tiles: 4, eggs: 1 },
    ];
    const multiplierTable: Record<string, number[]> = {};
    for (const l of levels) {
      const table: number[] = [];
      const p = l.eggs / l.tiles;
      let cumulative = 1;
      for (let i = 1; i <= this.LEVELS; i++) {
        cumulative *= p;
        const mult = (1 / cumulative) * (1 - this.HOUSE_EDGE);
        table.push(parseFloat(mult.toFixed(2)));
      }
      multiplierTable[l.difficulty] = table;
    }
    return {
      levels,
      multiplierTable,
      autoPick: true,
      cashoutEnabled: true,
      variants: {
        goldenSpiral: false,
        flamePath: false,
        twinDragons: false,
        timeAscent: false,
        mysticMist: false,
      },
      theme: "oriental",
    };
  }

  private readonly HOUSE_EDGE = 0.02;
  private readonly LEVELS = 9;

  // dynamic config built on initialization
  private config: DragonTowerGameConfigDto;

  async startGame(
    dragonTowerStartGameDto: DragonTowerStartGameDto,
    traceId: string,
  ): Promise<DragonTowerStartGameResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(dragonTowerStartGameDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(32).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");
    const gridEntry =
      this.config.levels.find(
        (l) => l.difficulty === dragonTowerStartGameDto.difficulty,
      ) || this.config.levels[0];
    const gridSize = { rows: this.LEVELS, columns: gridEntry.tiles };

    const game = this.gamesRepo.create({
      wager: dragonTowerStartGameDto.wager,
      difficulty: dragonTowerStartGameDto.difficulty,
      variant: dragonTowerStartGameDto.variant,
      serverSeed,
      serverSeedHash,
      clientSeed:
        dragonTowerStartGameDto.clientSeed || randomBytes(16).toString("hex"),
      gridRows: this.LEVELS,
      gridColumns: gridEntry.tiles,
      revealedTiles: [],
      levelReached: 0,
      isCompleted: false,
      multiplier: 1,
    });
    try {
      await this.gamesRepo.save(game);
      this.logger.info(
        `Game started with id ${game.gameId}`,
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
      gameId: game.gameId,
      gridSize,
      serverSeedHash,
      difficulty: dragonTowerStartGameDto.difficulty,
      config: this.config,
    };
  }

  async revealTile(
    dragonTowerRevealTileDto: DragonTowerRevealTileDto,
    traceId: string,
  ): Promise<DragonTowerRevealTileResponseDto> {
    this.logger.debug(
      `Reveal tile with ${JSON.stringify(dragonTowerRevealTileDto)}`,
      traceId,
      "revealTile",
      LogStreamLevel.DebugLight,
    );
    let state: DragonTowerGame | null = null;
    try {
      state = await this.gamesRepo.findOne({
        where: { gameId: dragonTowerRevealTileDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "revealTile",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!state || state.isCompleted) {
      return {
        isEgg: false,
        multiplier: state?.multiplier || 0,
        levelReached: state?.levelReached || 0,
        gameOver: true,
        revealedTiles: state?.revealedTiles || [],
      };
    }

    if (
      dragonTowerRevealTileDto.tileIndex < 0 ||
      dragonTowerRevealTileDto.tileIndex >= state.gridColumns
    ) {
      return {
        isEgg: false,
        multiplier: state.multiplier,
        levelReached: state.levelReached,
        gameOver: state.isCompleted,
        revealedTiles: state.revealedTiles,
      };
    }

    const currentRow = state.levelReached;
    const configEntry =
      this.config.levels.find((l) => l.difficulty === state.difficulty) ||
      this.config.levels[0];
    const eggs = this.computeEggPositions(
      state.serverSeed,
      state.clientSeed || "",
      currentRow,
      state.gridColumns,
      configEntry.eggs,
    );
    const isEgg = eggs.includes(dragonTowerRevealTileDto.tileIndex);

    state.revealedTiles.push(
      currentRow * 10 + dragonTowerRevealTileDto.tileIndex,
    );
    if (isEgg) {
      state.levelReached += 1;
      state.multiplier = this.getMultiplier(
        state.difficulty,
        state.levelReached,
      );
      if (state.levelReached >= state.gridRows) {
        state.isCompleted = true;
      }
    } else {
      state.isCompleted = true;
    }
    try {
      await this.gamesRepo.save(state);
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "revealTile",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    this.logger.debug(
      `Tile revealed ${dragonTowerRevealTileDto.tileIndex} => ${isEgg}`,
      traceId,
      "revealTile",
      LogStreamLevel.DebugLight,
    );

    return {
      isEgg,
      multiplier: state.multiplier,
      levelReached: state.levelReached,
      gameOver: state.isCompleted,
      revealedTiles: state.revealedTiles,
    };
  }

  async cashout(
    dragonTowerCashoutDto: DragonTowerCashoutDto,
    traceId: string,
  ): Promise<DragonTowerCashoutResponseDto> {
    this.logger.debug(
      `Cashout game with ${JSON.stringify(dragonTowerCashoutDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let state: DragonTowerGame | null = null;
    try {
      state = await this.gamesRepo.findOne({
        where: { gameId: dragonTowerCashoutDto.gameId },
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
    if (!state) {
      return { payout: 0, multiplier: 0, level: 0 };
    }
    state.isCompleted = true;
    try {
      await this.gamesRepo.save(state);
      this.logger.info(
        `Game ${dragonTowerCashoutDto.gameId} cashed out`,
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
    const payout = state.wager * state.multiplier;
    this.logger.info(
      `Game ${dragonTowerCashoutDto.gameId} cashed out`,
      traceId,
      "cashout",
      LogStreamLevel.ProdStandard,
    );
    return { payout, multiplier: state.multiplier, level: state.levelReached };
  }

  async getConfig(
    _dto?: DragonTowerConfigRequestDto,
  ): Promise<DragonTowerGameConfigDto> {
    return this.config;
  }

  async getProvablyFair(
    dragonTowerProvablyFairRequestDto: DragonTowerProvablyFairRequestDto,
    traceId: string,
  ): Promise<DragonTowerProvablyFairDto> {
    this.logger.debug(
      `Provably fair request with ${JSON.stringify(dragonTowerProvablyFairRequestDto)}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let state: DragonTowerGame | null = null;
    try {
      state = await this.gamesRepo.findOne({
        where: { gameId: dragonTowerProvablyFairRequestDto.gameId },
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
    if (!state) {
      return {
        serverSeedHash: "",
        serverSeed: "",
        clientSeed: "",
        nonceMap: [],
      };
    }
    const nonceMap: string[] = [];
    const configEntry =
      this.config.levels.find((l) => l.difficulty === state.difficulty) ||
      this.config.levels[0];
    for (let i = 0; i < state.gridRows; i++) {
      const eggs = this.computeEggPositions(
        state.serverSeed,
        state.clientSeed || "",
        i,
        state.gridColumns,
        configEntry.eggs,
      );
      eggs.forEach((e) => nonceMap.push((i * 10 + e).toString()));
    }
    const serverSeedHash = state.serverSeedHash;
    this.logger.info(
      `Provably fair data returned for ${state.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash,
      serverSeed: state.serverSeed,
      clientSeed: state.clientSeed,
      nonceMap,
    };
  }
}
