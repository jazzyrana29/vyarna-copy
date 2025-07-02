import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LimboGame } from "../../../entities/limbo-game.entity";
import {
  LimboStartGameDto,
  LimboStartGameResponseDto,
  LimboGameConfigDto,
  LimboProvablyFairDto,
  LimboProvablyFairRequestDto,
  LimboConfigRequestDto,
  LimboCashoutDto,
  LimboCashoutResponseDto,
} from "ez-utils";
import { randomBytes, createHash, createHmac } from "crypto";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class LimboService {
  private logger = getLoggerConfig(LimboService.name);
  constructor(
    @InjectRepository(LimboGame)
    private readonly limboRepo: Repository<LimboGame>,
  ) {
    this.logger.debug(
      `${LimboService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  private readonly config: LimboGameConfigDto = {
    maxPayout: 1000000,
    houseEdge: 0.01,
    minMultiplier: 1.01,
    defaultTarget: 2,
    autoCashout: false,
    reverseMode: false,
    turboMode: false,
    theme: "default",
  };

  private async getNextNonce(clientSeed: string): Promise<number> {
    let last: LimboGame | null = null;
    try {
      last = await this.limboRepo.findOne({
        where: { clientSeed },
        order: { nonce: "DESC" },
      });
    } catch (error: any) {
      this.logger.error(
        `Error fetching nonce: ${error.message}`,
        "",
        "getNextNonce",
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
    return last ? last.nonce + 1 : 0;
  }

  private computeMultiplier(
    serverSeed: string,
    clientSeed: string,
    nonce: number,
  ): number {
    const hmac = createHmac("sha256", serverSeed)
      .update(`${clientSeed}:${nonce}:0`)
      .digest();
    const int = hmac.readUInt32BE(0);
    const r = int / 0xffffffff;
    let multiplier =
      r === 0 ? this.config.maxPayout : (1 / r) * (1 - this.config.houseEdge);
    if (!Number.isFinite(multiplier)) multiplier = this.config.maxPayout;
    multiplier = Math.min(this.config.maxPayout, multiplier);
    multiplier = Math.floor(multiplier * 100) / 100;
    return Math.max(this.config.minMultiplier, multiplier);
  }

  async startGame(
    limboStartGameDto: LimboStartGameDto,
    traceId: string,
  ): Promise<LimboStartGameResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(limboStartGameDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    if (limboStartGameDto.wager <= 0) {
      throw new BadRequestException("Wager must be greater than 0");
    }
    if (limboStartGameDto.targetMultiplier < this.config.minMultiplier) {
      throw new BadRequestException(
        `Target multiplier must be at least ${this.config.minMultiplier}`,
      );
    }

    const serverSeed = randomBytes(32).toString("hex");
    const serverSeedHash = createHash("sha256")
      .update(serverSeed)
      .digest("hex");

    const nonce = await this.getNextNonce(limboStartGameDto.clientSeed);
    const outcome = this.computeMultiplier(
      serverSeed,
      limboStartGameDto.clientSeed,
      nonce,
    );

    const payout =
      outcome >= limboStartGameDto.targetMultiplier
        ? limboStartGameDto.wager * limboStartGameDto.targetMultiplier
        : 0;

    const game = this.limboRepo.create({
      operatorId: "unknown",
      businessUnitId: "unknown",
      serverSeedHash,
      serverSeed,
      clientSeed: limboStartGameDto.clientSeed,
      wager: limboStartGameDto.wager,
      targetMultiplier: limboStartGameDto.targetMultiplier,
      nonce,
      outcome,
      payout,
      isCompleted: true,
    });
    try {
      await this.limboRepo.save(game);
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

    return {
      gameId: game.gameId,
      outcome,
      payout,
      nonce,
      serverSeedHash: game.serverSeedHash,
    };
  }

  async cashout(
    limboCashoutDto: LimboCashoutDto,
    traceId: string,
  ): Promise<LimboCashoutResponseDto | null> {
    this.logger.debug(
      `Cashout with ${JSON.stringify(limboCashoutDto)}`,
      traceId,
      "cashout",
      LogStreamLevel.DebugLight,
    );
    let game: LimboGame | null = null;
    try {
      game = await this.limboRepo.findOne({
        where: { gameId: limboCashoutDto.gameId },
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
    if (!game) return null;
    game.isCompleted = true;
    try {
      await this.limboRepo.save(game);
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
    return { gameId: game.gameId, payout: game.payout ?? 0 };
  }

  async getConfig(
    limboConfigRequestDto: LimboConfigRequestDto,
    traceId: string,
  ): Promise<LimboGameConfigDto> {
    this.logger.debug(
      "Fetching config",
      traceId,
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    return this.config;
  }

  async getProvablyFair(
    limboProvablyFairRequestDto: LimboProvablyFairRequestDto,
    traceId: string,
  ): Promise<LimboProvablyFairDto | null> {
    this.logger.debug(
      `Provably fair request for ${limboProvablyFairRequestDto.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    let game: LimboGame | null = null;
    try {
      game = await this.limboRepo.findOne({
        where: { gameId: limboProvablyFairRequestDto.gameId },
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
    this.logger.info(
      `Provably fair data returned for ${game.gameId}`,
      traceId,
      "getProvablyFair",
      LogStreamLevel.ProdStandard,
    );
    return {
      gameId: game.gameId,
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed || "",
      nonce: game.nonce,
    };
  }
}
