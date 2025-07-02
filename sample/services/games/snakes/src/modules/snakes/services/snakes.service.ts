import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnakesRound } from '../../../entities/snakes-round.entity';
import {
  CreateSnakesRoundDto,
  UpdateSnakesRoundDto,
  GetSnakesRoundDto,
  SnakesConfigDto,
  SnakesProvablyFairDto,
  SnakesConfigRequestDto,
  SnakesProvablyFairRequestDto,
  SnakesRollDiceDto,
  RollDiceResponseDto,
  SnakesCashoutDto,
  CashoutResponseDto,
} from 'ez-utils';
import { randomBytes, createHash, createHmac } from 'crypto';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class SnakesService {
  private logger = getLoggerConfig(SnakesService.name);
  constructor(
    @InjectRepository(SnakesRound)
    private readonly roundsRepo: Repository<SnakesRound>,
  ) {
    this.logger.debug(
      `${SnakesService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  private readonly config: SnakesConfigDto = {
    spaces: 12,
    snakesCount: 3,
    multiplierTable: [1.01, 1.11, 1.38],
    volatility: 'medium',
    autoBet: true,
    instantBet: false,
    theme: 'dark',
    variants: {
      doubleDiceSurge: true,
      snakeTrail: true,
    },
  };

  private readonly VOLATILITY_TABLE: Record<
    string,
    { snakes: number; range: [number, number] }
  > = {
    easy: { snakes: 1, range: [1.01, 2.0] },
    medium: { snakes: 3, range: [1.11, 4.0] },
    hard: { snakes: 5, range: [1.38, 7.5] },
    expert: { snakes: 7, range: [3.82, 10.0] },
    master: { snakes: 9, range: [17.64, 18.0] },
  };

  private generateBoard(
    volatility: string,
    serverSeed: string,
    clientSeed: string,
  ): any {
    const config =
      this.VOLATILITY_TABLE[volatility] || this.VOLATILITY_TABLE.medium;
    const spaces = this.config.spaces;
    const snakes = new Set<number>();
    let nonce = 0;
    while (snakes.size < config.snakes) {
      const h = createHmac('sha256', serverSeed)
        .update(`${clientSeed}:${nonce}`)
        .digest();
      const idx = h.readUInt32BE(0) % spaces;
      snakes.add(idx);
      nonce++;
    }
    const board = [] as { type: string; value?: number }[];
    for (let i = 0; i < spaces; i++) {
      if (snakes.has(i)) {
        board.push({ type: 'snake' });
      } else {
        const h = createHmac('sha256', serverSeed)
          .update(`${clientSeed}:${nonce + i}`)
          .digest();
        const rnd = h.readUInt32BE(0) / 0xffffffff;
        const [min, max] = config.range;
        const val = parseFloat((min + rnd * (max - min)).toFixed(2));
        board.push({ type: 'multiplier', value: val });
      }
    }
    return { board, position: 0, visited: [] as number[] };
  }

  async createRound(
    createSnakesRoundDto: CreateSnakesRoundDto,
    traceId: string,
  ): Promise<SnakesRound> {
    this.logger.debug(
      `Creating round with ${JSON.stringify(createSnakesRoundDto)}`,
      traceId,
      'createRound',
      LogStreamLevel.DebugLight,
    );
    const serverSeed = randomBytes(16).toString('hex');
    const serverSeedHash = createHash('sha256')
      .update(serverSeed)
      .digest('hex');
    const clientSeed =
      createSnakesRoundDto.clientSeed || randomBytes(8).toString('hex');
    const board = this.generateBoard(
      createSnakesRoundDto.volatility,
      serverSeed,
      clientSeed,
    );

    const round = this.roundsRepo.create({
      ...createSnakesRoundDto,
      clientSeed,
      currentMultiplier: 1,
      boardState: board,
      isFinished: false,
      serverSeed,
      serverSeedHash,
      nonce: 0,
    });
    try {
      const saved = await this.roundsRepo.save(round);
      this.logger.info(
        `Round ${saved.roundId} created`,
        traceId,
        'createRound',
        LogStreamLevel.ProdStandard,
      );
      return saved;
    } catch (error: any) {
      this.logger.error(
        `Error creating round: ${error.message}`,
        traceId,
        'createRound',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
  }

  async updateRound(
    updateSnakesRoundDto: UpdateSnakesRoundDto,
    traceId: string,
  ): Promise<SnakesRound> {
    this.logger.debug(
      `Updating round with ${JSON.stringify(updateSnakesRoundDto)}`,
      traceId,
      'updateRound',
      LogStreamLevel.DebugLight,
    );
    try {
      const saved = await this.roundsRepo.save({
        roundId: updateSnakesRoundDto.roundId,
        ...updateSnakesRoundDto,
      });
      this.logger.info(
        `Round ${saved.roundId} updated`,
        traceId,
        'updateRound',
        LogStreamLevel.ProdStandard,
      );
      return saved;
    } catch (error: any) {
      this.logger.error(
        `Error updating round: ${error.message}`,
        traceId,
        'updateRound',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
  }

  private rollTwoDice(round: SnakesRound): [number, number] {
    const nonce = round.nonce + 1;
    const seed = round.clientSeed || '';
    const hmac = createHmac('sha256', round.serverSeed)
      .update(`${seed}:${nonce}`)
      .digest();
    const d1 = (hmac.readUInt32BE(0) % 6) + 1;
    const d2 = (hmac.readUInt32BE(4) % 6) + 1;
    round.nonce = nonce;
    return [d1, d2];
  }

  async rollDice(
    snakesRollDiceDto: SnakesRollDiceDto,
    traceId: string,
  ): Promise<RollDiceResponseDto> {
    this.logger.debug(
      `Rolling dice with ${JSON.stringify(snakesRollDiceDto)}`,
      traceId,
      'rollDice',
      LogStreamLevel.DebugLight,
    );
    let round: SnakesRound | null = null;
    try {
      round = await this.roundsRepo.findOne({
        where: { roundId: snakesRollDiceDto.roundId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching round: ${error.message}`,
        traceId,
        'rollDice',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!round) throw new NotFoundException('Round not found');
    if (round.isFinished) {
      return {
        dice1: 0,
        dice2: 0,
        newPosition: round.boardState.position || 0,
        isSnake: false,
        stepMultiplier: 0,
        currentMultiplier: round.currentMultiplier,
        gameOver: true,
      };
    }
    const [d1, d2] = this.rollTwoDice(round);
    const move = d1 + d2;
    const board = round.boardState.board as any[];
    const spaces = board.length;
    let pos = round.boardState.position || 0;
    pos = (pos + move) % spaces;
    const tile = board[pos];
    let isSnake = false;
    let stepMultiplier = 0;
    if (tile.type === 'snake') {
      isSnake = true;
      round.isFinished = true;
    } else {
      stepMultiplier = tile.value || 1;
      round.currentMultiplier = parseFloat(
        (round.currentMultiplier * stepMultiplier).toFixed(4),
      );
      round.boardState.visited.push(pos);
    }
    round.boardState.position = pos;
    try {
      await this.roundsRepo.save(round);
      this.logger.info(
        `Round ${round.roundId} rolled`,
        traceId,
        'rollDice',
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving round: ${error.message}`,
        traceId,
        'rollDice',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    return {
      dice1: d1,
      dice2: d2,
      newPosition: pos,
      isSnake,
      stepMultiplier,
      currentMultiplier: round.currentMultiplier,
      gameOver: round.isFinished,
    };
  }

  async cashout(
    snakesCashoutDto: SnakesCashoutDto,
    traceId: string,
  ): Promise<CashoutResponseDto> {
    this.logger.debug(
      `Cashout round with ${JSON.stringify(snakesCashoutDto)}`,
      traceId,
      'cashout',
      LogStreamLevel.DebugLight,
    );
    let round: SnakesRound | null = null;
    try {
      round = await this.roundsRepo.findOne({
        where: { roundId: snakesCashoutDto.roundId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching round: ${error.message}`,
        traceId,
        'cashout',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!round) throw new NotFoundException('Round not found');
    round.isFinished = true;
    try {
      await this.roundsRepo.save(round);
      this.logger.info(
        `Round ${round.roundId} cashed out`,
        traceId,
        'cashout',
        LogStreamLevel.ProdStandard,
      );
    } catch (error: any) {
      this.logger.error(
        `Error saving round: ${error.message}`,
        traceId,
        'cashout',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    const payout = parseFloat(
      (Number(round.betAmount) * round.currentMultiplier).toFixed(2),
    );
    return { payout, multiplier: round.currentMultiplier };
  }

  async findRound(
    getSnakesRoundDto: GetSnakesRoundDto,
    traceId: string,
  ): Promise<SnakesRound | null> {
    this.logger.debug(
      `Finding round with ${JSON.stringify(getSnakesRoundDto)}`,
      traceId,
      'findRound',
      LogStreamLevel.DebugLight,
    );
    try {
      return await this.roundsRepo.findOne({
        where: { roundId: getSnakesRoundDto.roundId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error finding round: ${error.message}`,
        traceId,
        'findRound',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
  }

  async getConfig(
    snakesConfigRequestDto: SnakesConfigRequestDto,
    traceId: string,
  ): Promise<SnakesConfigDto> {
    this.logger.debug(
      'Fetching config',
      traceId,
      'getConfig',
      LogStreamLevel.DebugLight,
    );
    return this.config;
  }

  async getProvablyFair(
    snakesProvablyFairRequestDto: SnakesProvablyFairRequestDto,
    traceId: string,
  ): Promise<SnakesProvablyFairDto> {
    this.logger.debug(
      `Provably fair request with ${JSON.stringify(snakesProvablyFairRequestDto)}`,
      traceId,
      'getProvablyFair',
      LogStreamLevel.DebugLight,
    );
    let round: SnakesRound | null = null;
    try {
      round = await this.roundsRepo.findOne({
        where: { roundId: snakesProvablyFairRequestDto.roundId },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching round: ${error.message}`,
        traceId,
        'getProvablyFair',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    if (!round) throw new NotFoundException('Round not found');
    this.logger.info(
      `Provably fair data returned for ${round.roundId}`,
      traceId,
      'getProvablyFair',
      LogStreamLevel.ProdStandard,
    );
    return {
      serverSeedHash: round.serverSeedHash,
      serverSeed: round.serverSeed,
      clientSeed: round.clientSeed || '',
      nonce: round.nonce,
    };
  }
}
