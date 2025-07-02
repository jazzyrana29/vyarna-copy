import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MinesGame } from "../../../entities/mines-game.entity";
import {
  MinesStartGameDto,
  MinesRevealTileDto,
  MinesCashoutDto,
  MinesConfigRequestDto,
  MinesProvablyFairRequestDto,
  MinesStartGameResponseDto,
  MinesRevealTileResponseDto,
  MinesCashoutResponseDto,
  MinesGameConfigDto,
  MinesProvablyFairDto,
} from "ez-utils";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import { createHmac, createHash, randomBytes } from "crypto";

@Injectable()
export class MinesService {
  private logger = getLoggerConfig(MinesService.name);
  private readonly GRID_SIZE = 5;

  private config: MinesGameConfigDto;
  constructor(
    @InjectRepository(MinesGame)
    private readonly minesRepo: Repository<MinesGame>,
  ) {
    this.logger.debug(
      `${MinesService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );

    this.config = {
      gridSizes: [{ rows: this.GRID_SIZE, columns: this.GRID_SIZE }],
      minesRange: [1, 24],
      defaultVariant: "classic",
      enabledVariants: ["classic"],
      multiplierTables: {},
    };

    for (let m = 1; m <= 24; m++) {
      const table: number[] = [];
      for (let r = 1; r <= this.GRID_SIZE * this.GRID_SIZE - m; r++) {
        table.push(this.calculateMultiplier(r, m));
      }
      this.config.multiplierTables[m] = table;
    }
  }

  private combination(n: number, r: number): number {
    if (r > n) return 0;
    let result = 1;
    for (let i = 1; i <= r; i++) {
      result = (result * (n - r + i)) / i;
    }
    return result;
  }

  private calculateMultiplier(revealed: number, mines: number): number {
    const odds =
      this.combination(25 - mines, revealed) / this.combination(25, revealed);
    const multiplier = (1 / odds) * 0.99;
    return parseFloat(multiplier.toFixed(4));
  }

  private generateMineField(
    serverSeed: string,
    clientSeed: string,
    mineCount: number,
    nonce: number,
  ): boolean[] {
    const entries = Array.from({ length: 25 }, (_, i) => {
      const h = createHmac("sha256", serverSeed)
        .update(`${clientSeed}:${nonce}:${i}`)
        .digest();
      const v = h.readUInt32BE(0);
      return { idx: i, val: v };
    });
    entries.sort((a, b) => a.val - b.val);
    const field = Array(25).fill(false);
    for (let i = 0; i < mineCount; i++) {
      field[entries[i].idx] = true;
    }
    return field;
  }

  async startGame(
    minesStartGameDto: MinesStartGameDto,
    traceId: string,
  ): Promise<MinesStartGameResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(minesStartGameDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(32).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");
    const clientSeed =
      minesStartGameDto.clientSeed || randomBytes(16).toString("hex");

    const game = this.minesRepo.create({
      operatorId: minesStartGameDto.operatorId,
      businessUnitId: minesStartGameDto.businessUnitId,
      serverSeedHash,
      serverSeed,
      clientSeed,
      numMines: minesStartGameDto.numMines,
      wager: minesStartGameDto.wager,
      revealedTiles: [],
    });
    try {
      await this.minesRepo.save(game);
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

    const multiplierTable = this.config.multiplierTables[game.numMines] || [];

    return {
      gameId: game.gameId,
      gridSize: { rows: this.GRID_SIZE, columns: this.GRID_SIZE },
      serverSeedHash: game.serverSeedHash,
      variant: this.config.defaultVariant,
      multiplierTable,
    };
  }

  async revealTile(
    minesRevealTileDto: MinesRevealTileDto,
    traceId: string,
  ): Promise<MinesRevealTileResponseDto> {
    this.logger.debug(
      `Reveal tile with ${JSON.stringify(minesRevealTileDto)}`,
      traceId,
      "revealTile",
      LogStreamLevel.DebugLight,
    );
    let game: MinesGame | null = null;
    try {
      game = await this.minesRepo.findOne({
        where: { gameId: minesRevealTileDto.gameId },
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
    if (!game) throw new NotFoundException("Game not found");

    if (
      minesRevealTileDto.tileIndex < 0 ||
      minesRevealTileDto.tileIndex >= this.GRID_SIZE * this.GRID_SIZE
    ) {
      throw new BadRequestException("Tile index out of bounds");
    }

    const currentNonce = game.nonce;
    const field = this.generateMineField(
      game.serverSeed,
      game.clientSeed || "",
      game.numMines,
      currentNonce,
    );

    if (
      game.isCompleted ||
      game.revealedTiles.includes(minesRevealTileDto.tileIndex)
    ) {
      const safe = game.revealedTiles.filter((i) => !field[i]).length;
      return {
        isMine: false,
        multiplier: this.calculateMultiplier(safe, game.numMines),
        safeTilesRevealed: safe,
        gameOver: true,
        revealedTiles: game.revealedTiles,
      };
    }

    const isMine = field[minesRevealTileDto.tileIndex];
    game.revealedTiles.push(minesRevealTileDto.tileIndex);
    game.nonce += 1;
    if (isMine) {
      game.isCompleted = true;
    }
    try {
      await this.minesRepo.save(game);
    } catch (error: any) {
      if (error.name === "OptimisticLockVersionMismatchError") {
        throw new ConflictException("Concurrency conflict, please retry");
      }
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "revealTile",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    const safe = game.revealedTiles.filter((i) => !field[i]).length;
    const multiplier = isMine
      ? 0
      : this.calculateMultiplier(safe, game.numMines);

    if (safe === this.GRID_SIZE * this.GRID_SIZE - game.numMines) {
      game.isCompleted = true;
      try {
        await this.minesRepo.save(game);
      } catch (error: any) {
        if (error.name === "OptimisticLockVersionMismatchError") {
          throw new ConflictException("Concurrency conflict, please retry");
        }
        this.logger.error(
          `Error saving game: ${error.message}`,
          traceId,
          "revealTile",
          LogStreamLevel.DebugHeavy,
        );
        throw error;
      }
    }

    return {
      isMine,
      multiplier,
      safeTilesRevealed: safe,
      gameOver: game.isCompleted,
      revealedTiles: game.revealedTiles,
    };
  }

  async cashout(
    minesCashoutDto: MinesCashoutDto,
    traceId: string,
  ): Promise<MinesCashoutResponseDto> {
    this.logger.debug(
      `Cashout with ${JSON.stringify(minesCashoutDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let game: MinesGame | null = null;
    try {
      game = await this.minesRepo.findOne({
        where: { gameId: minesCashoutDto.gameId },
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

    const field = this.generateMineField(
      game.serverSeed,
      game.clientSeed || "",
      game.numMines,
      game.nonce,
    );
    const safe = game.revealedTiles.filter((i) => !field[i]).length;
    const multiplier = this.calculateMultiplier(safe, game.numMines);
    const payout = parseFloat((game.wager * multiplier).toFixed(2));

    game.isCompleted = true;
    try {
      await this.minesRepo.save(game);
      this.logger.info(
        `Game ${game.gameId} cashed out`,
        traceId,
        "cashout",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      if (error.name === "OptimisticLockVersionMismatchError") {
        throw new ConflictException("Concurrency conflict, please retry");
      }
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "cashout",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }

    return { payout, multiplier, tilesRevealed: safe };
  }

  async getConfig(
    _dto: MinesConfigRequestDto,
    _traceId: string,
  ): Promise<MinesGameConfigDto> {
    this.logger.debug(
      "Fetching config",
      _traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return this.config;
  }

  async getProvablyFair(
    minesProvablyFairRequestDto: MinesProvablyFairRequestDto,
    _traceId: string,
  ): Promise<MinesProvablyFairDto> {
    this.logger.debug(
      `Provably fair request with ${JSON.stringify(minesProvablyFairRequestDto)}`,
      _traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let game: MinesGame | null = null;
    try {
      game = await this.minesRepo.findOne({
        where: { gameId: minesProvablyFairRequestDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        _traceId,
        "getProvablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) throw new NotFoundException("Game not found");
    this.logger.info(
      `Provably fair data returned for ${game.gameId}`,
      _traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed,
      nonceMap: Array.from({ length: game.nonce }, (_, i) => String(i)),
    };
  }
}
