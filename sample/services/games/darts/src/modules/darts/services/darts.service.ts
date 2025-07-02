import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createHash, createHmac, randomBytes } from "crypto";
import {
  StartDartsGameDto,
  StartDartsGameResponseDto,
  ThrowDartDto,
  CashoutDartsGameDto,
  DartsProvablyFairRequestDto,
  DartsProvablyFairDto,
  DartsConfigRequestDto,
} from "ez-utils";
import { DartsGame } from "../../../entities/darts-game.entity";
import { DartThrow } from "../../../entities/dart-throw.entity";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class DartsService {
  private logger = getLoggerConfig(DartsService.name);
  private readonly HOUSE_EDGE = 0.02;
  private totalBet = 0;
  private totalPayout = 0;

  private generateRange(start: number, end: number, step: number): number[] {
    const arr: number[] = [];
    for (let v = start; v <= end + 1e-9; v += step) {
      arr.push(parseFloat(v.toFixed(2)));
    }
    return arr;
  }

  private readonly DIFFICULTY_TABLE: Record<string, number[]> = {
    easy: this.generateRange(0.5, 8.5, 0.5),
    medium: this.generateRange(0.4, 16.0, 0.4),
    hard: this.generateRange(0.2, 63.0, 0.2),
    expert: this.generateRange(0.1, 500.0, 0.1),
  };

  getCurrentRtp(): number {
    if (this.totalBet === 0) return 0;
    return parseFloat((this.totalPayout / this.totalBet).toFixed(4));
  }
  constructor(
    @InjectRepository(DartsGame)
    private readonly dartsGameRepository: Repository<DartsGame>,
    @InjectRepository(DartThrow)
    private readonly dartThrowRepository: Repository<DartThrow>,
  ) {
    this.logger.debug(
      `${DartsService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  private getRandomMultiplier(game: DartsGame, nonce: number): number {
    const hmac = createHmac("sha256", game.serverSeed)
      .update(`${game.clientSeed || ""}:${nonce}`)
      .digest();
    const options =
      this.DIFFICULTY_TABLE[game.difficulty] || this.DIFFICULTY_TABLE.easy;
    const high = hmac.readUInt32BE(0);
    const low = hmac.readUInt32BE(4);
    const combined = (BigInt(high) << 32n) | BigInt(low);
    const idx = Number(combined % BigInt(options.length));
    return options[idx];
  }

  async startDartsGame(
    startDartsGameDto: StartDartsGameDto,
    traceId: string,
  ): Promise<StartDartsGameResponseDto> {
    this.logger.debug(
      `Starting darts game with ${JSON.stringify(startDartsGameDto)}`,
      traceId,
      "startDartsGame",
      LogStreamLevel.DebugLight,
    );
    if (startDartsGameDto.bet <= 0) {
      throw new BadRequestException("Bet must be positive");
    }

    const difficultyOptions =
      this.DIFFICULTY_TABLE[startDartsGameDto.difficulty];
    if (!difficultyOptions) {
      throw new BadRequestException("Unsupported difficulty");
    }

    const serverSeed = randomBytes(16).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");
    const clientSeed =
      startDartsGameDto.clientSeed || randomBytes(8).toString("hex");
    const game = this.dartsGameRepository.create({
      bet: startDartsGameDto.bet,
      difficulty: startDartsGameDto.difficulty,
      clientSeed,
      serverSeed,
      serverSeedHash,
    });
    try {
      await this.dartsGameRepository.save(game);
      this.logger.info(
        `Game ${game.gameId} created`,
        traceId,
        "startDartsGame",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "startDartsGame",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    this.totalBet += Number(game.bet);
    const response: StartDartsGameResponseDto = {
      gameId: game.gameId,
      bet: game.bet,
      difficulty: game.difficulty as any,
      clientSeed: game.clientSeed!,
      serverSeedHash: game.serverSeedHash,
    };
    return response;
  }

  async throwDart(
    throwDartDto: ThrowDartDto,
    traceId: string,
  ): Promise<DartThrow> {
    this.logger.debug(
      `Throw dart with ${JSON.stringify(throwDartDto)}`,
      traceId,
      "throwDart",
      LogStreamLevel.DebugLight,
    );
    let game: DartsGame | null = null;
    try {
      game = await this.dartsGameRepository.findOne({
        where: { gameId: throwDartDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "throwDart",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) {
      throw new NotFoundException("Game not found");
    }
    const turn = game.nonce + 1;
    const multiplier = this.getRandomMultiplier(game, turn);
    const dart = this.dartThrowRepository.create({
      gameId: game.gameId,
      turn,
      multiplier,
      hit: multiplier > 1,
    });
    try {
      await this.dartThrowRepository.save(dart);
      game.nonce = turn;
      await this.dartsGameRepository.save(game);
      this.logger.info(
        `Dart thrown in game ${game.gameId}`,
        traceId,
        "throwDart",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving throw: ${error.message}`,
        traceId,
        "throwDart",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    return dart;
  }

  async cashoutDartsGame(
    cashoutDartsGameDto: CashoutDartsGameDto,
    traceId: string,
  ): Promise<{ payout: number }> {
    this.logger.debug(
      `Cashout game with ${JSON.stringify(cashoutDartsGameDto)}`,
      traceId,
      "cashoutDartsGame",
      LogStreamLevel.DebugLight,
    );
    let game: DartsGame | null = null;
    try {
      game = await this.dartsGameRepository.findOne({
        where: { gameId: cashoutDartsGameDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching game: ${error.message}`,
        traceId,
        "cashoutDartsGame",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!game) {
      throw new NotFoundException("Game not found");
    }
    let throws: DartThrow[] = [];
    try {
      throws = await this.dartThrowRepository.find({
        where: { gameId: game.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching throws: ${error.message}`,
        traceId,
        "cashoutDartsGame",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    const totalMultiplier = throws.reduce(
      (acc, t) => acc * Number(t.multiplier),
      1,
    );
    const maxMultiplier =
      this.DIFFICULTY_TABLE[game.difficulty][
        this.DIFFICULTY_TABLE[game.difficulty].length - 1
      ];
    const gross = Number(game.bet) * Math.min(totalMultiplier, maxMultiplier);
    game.payout = parseFloat((gross * (1 - this.HOUSE_EDGE)).toFixed(2));
    game.status = "cashed";
    try {
      await this.dartsGameRepository.save(game);
      this.logger.info(
        `Game ${game.gameId} cashed out`,
        traceId,
        "cashoutDartsGame",
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving game: ${error.message}`,
        traceId,
        "cashoutDartsGame",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    this.totalPayout += game.payout;
    return { payout: game.payout };
  }

  async getConfig(
    dartsConfigRequestDto: DartsConfigRequestDto,
    traceId: string,
  ): Promise<any> {
    this.logger.debug(
      "Fetching config",
      traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return {
      difficulty: Object.keys(this.DIFFICULTY_TABLE),
      multiplierTable: this.DIFFICULTY_TABLE,
      houseEdge: this.HOUSE_EDGE,
      maxSimultaneousBets: 5,
      variants: {
        rapidFire: true,
        bullseyeBlitz: true,
        arcingChallenge: false,
        timedTournament: false,
        precisionPath: false,
      },
      provablyFair: true,
    };
  }

  async getProvablyFair(
    dartsProvablyFairRequestDto: DartsProvablyFairRequestDto,
    traceId: string,
  ): Promise<DartsProvablyFairDto | null> {
    this.logger.debug(
      `Provably fair request for ${dartsProvablyFairRequestDto.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let game: DartsGame | null = null;
    try {
      game = await this.dartsGameRepository.findOne({
        where: { gameId: dartsProvablyFairRequestDto.gameId },
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
    if (!game) return null;
    let throws: DartThrow[] = [];
    try {
      throws = await this.dartThrowRepository.find({
        where: { gameId: dartsProvablyFairRequestDto.gameId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching throws: ${error.message}`,
        traceId,
        "getProvablyFair",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    this.logger.info(
      `Provably fair data returned for ${game.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed,
      nonceMap: throws.map((t) => String(t.turn)),
    };
  }

  async processBetsBatch(
    startDartsGameDtos: StartDartsGameDto[],
    traceId: string,
  ): Promise<(StartDartsGameResponseDto | { error: string })[]> {
    const results: (StartDartsGameResponseDto | { error: string })[] = [];
    for (const bet of startDartsGameDtos) {
      try {
        const res = await this.startDartsGame(bet, traceId);
        results.push(res);
      } catch (e: any) {
        results.push({ error: e.message });
      }
    }
    return results;
  }
}
