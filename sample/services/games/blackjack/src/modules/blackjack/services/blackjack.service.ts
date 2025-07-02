import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomBytes, createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";
import {
  BlackjackGameConfigDto,
  HitResponseDto,
  BlackjackProvablyFairDto,
  StandResponseDto,
  BlackjackStartGameDto,
  BlackjackStartGameResponseDto,
  BlackjackHitDto,
  BlackjackStandDto,
  BlackjackSplitDto,
  BlackjackDoubleDto,
  BlackjackInsuranceDto,
  BlackjackConfigRequestDto,
  BlackjackProvablyFairRequestDto,
  BlackjackGameStateDto,
} from "ez-utils";
import { BlackjackGameStateDto as GameState } from "ez-utils";
import { BlackjackGame } from "../../../entities/blackjack-game.entity";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class BlackjackService {
  private logger = getLoggerConfig(BlackjackService.name);

  constructor(
    @InjectRepository(BlackjackGame)
    private readonly blackjackRepository: Repository<BlackjackGame>,
  ) {
    this.logger.debug(
      `${BlackjackService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }
  private config: BlackjackGameConfigDto = {
    decks: [6],
    minBet: 1,
    maxBet: 1000,
    enabledVariants: ["classic", "doubleExposure"],
    blackjackPayout: 1.5,
    winPayout: 1,
    insurancePayout: 2,
    penetration: 0.75,
    dealerStandSoft17: true,
  };

  private createDeck(decks: number): string[] {
    const suits = ["H", "D", "C", "S"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const deck: string[] = [];
    for (let d = 0; d < decks; d++) {
      for (const s of suits) {
        for (const r of ranks) {
          deck.push(`${r}${s}`);
        }
      }
    }
    return deck;
  }

  private drawCard(game: GameState): string {
    if (
      this.config.penetration &&
      game.deck.length <= game.totalCards * (1 - this.config.penetration)
    ) {
      game.deck = this.createDeck(game.decks);
      game.totalCards = game.deck.length;
    }
    const seed = game.clientSeed || "";
    const hmac = createHmac("sha256", game.serverSeed)
      .update(`${seed}:${game.nonce}`)
      .digest("hex");
    const idx = parseInt(hmac.slice(0, 13), 16) % game.deck.length;
    const [card] = game.deck.splice(idx, 1);
    game.nonce += 1;
    return card;
  }

  async startGame(
    blackjackStartGameDto: BlackjackStartGameDto,
    traceId: string,
  ): Promise<BlackjackStartGameResponseDto> {
    this.logger.debug(
      `Starting game with ${JSON.stringify(blackjackStartGameDto)}`,
      traceId,
      "startGame",
      LogStreamLevel.DebugLight,
    );
    const gameId = uuidv4();
    const serverSeed = randomBytes(16).toString("hex");
    const serverSeedHash = createHmac("sha256", serverSeed)
      .update("seed")
      .digest("hex");
    const deck = this.createDeck(blackjackStartGameDto.decks);
    const totalCards = deck.length;
    const tempState: GameState = {
      gameId,
      betAmount: blackjackStartGameDto.betAmount,
      decks: blackjackStartGameDto.decks,
      clientSeed: blackjackStartGameDto.clientSeed,
      serverSeed,
      serverSeedHash,
      deck,
      totalCards,
      playerHand: [],
      dealerHand: [],
      playerHands: [],
      currentHandIndex: 0,
      nonce: 0,
      isFinished: false,
    } as GameState;
    const playerHand = [this.drawCard(tempState), this.drawCard(tempState)];
    const dealerHand = [this.drawCard(tempState), this.drawCard(tempState)];
    tempState.playerHand = playerHand;
    tempState.dealerHand = dealerHand;
    tempState.playerHands = [playerHand];

    const gameState: GameState = tempState;

    const entity = this.blackjackRepository.create({
      gameId,
      playerHand,
      dealerHand,
      betAmount: blackjackStartGameDto.betAmount,
      clientSeed: blackjackStartGameDto.clientSeed,
      serverSeed,
      serverSeedHash,
      nonce: gameState.nonce,
      decks: blackjackStartGameDto.decks,
      isFinished: false,
      state: gameState,
    });
    await this.blackjackRepository.save(entity);

    return {
      gameId,
      playerHand,
      dealerUpCard: dealerHand[0],
      serverSeedHash,
    };
  }

  async hit(
    blackjackHitDto: BlackjackHitDto,
    traceId: string,
  ): Promise<HitResponseDto> {
    this.logger.debug(
      `Hit with ${JSON.stringify(blackjackHitDto)}`,
      traceId,
      "hit",
      LogStreamLevel.DebugLight,
    );
    const gameId = blackjackHitDto.gameId;
    const entity = await this.blackjackRepository.findOne({
      where: { gameId },
    });
    const game = entity?.state as GameState | undefined;
    if (!entity || !game || entity.isFinished) {
      throw new Error("Game not found or finished");
    }
    const hand = game.playerHands
      ? game.playerHands[game.currentHandIndex || 0]
      : game.playerHand;
    const card = this.drawCard(game);
    hand.push(card);
    if (game.playerHands) {
      game.playerHands[game.currentHandIndex || 0] = hand;
    }
    game.playerHand = hand;

    const gameOver = this.calculatePoints(hand) >= 21;
    entity.playerHand = game.playerHand;
    entity.dealerHand = game.dealerHand;
    entity.betAmount = game.betAmount;
    entity.nonce = game.nonce;
    entity.isFinished = game.isFinished;
    entity.state = game;
    await this.blackjackRepository.save(entity);

    return {
      card,
      playerHand: hand,
      gameOver,
    };
  }

  async stand(
    blackjackStandDto: BlackjackStandDto,
    traceId: string,
  ): Promise<StandResponseDto> {
    this.logger.debug(
      `Stand with ${JSON.stringify(blackjackStandDto)}`,
      traceId,
      "stand",
      LogStreamLevel.DebugLight,
    );
    const gameId = blackjackStandDto.gameId;
    const entity = await this.blackjackRepository.findOne({
      where: { gameId },
    });
    const game = entity?.state as GameState | undefined;
    if (!entity || !game || entity.isFinished) {
      throw new Error("Game not found or finished");
    }

    if (
      game.playerHands &&
      game.currentHandIndex! < game.playerHands.length - 1
    ) {
      game.currentHandIndex! += 1;
      game.playerHand = game.playerHands[game.currentHandIndex];
      entity.playerHand = game.playerHand;
      entity.dealerHand = game.dealerHand;
      entity.nonce = game.nonce;
      entity.betAmount = game.betAmount;
      entity.isFinished = game.isFinished;
      entity.state = game;
      await this.blackjackRepository.save(entity);
      return {
        dealerHand: [],
        result: "pending",
        payout: 0,
      } as StandResponseDto;
    }

    this.dealerTurn(game);

    const hands =
      game.playerHands && game.playerHands.length > 0
        ? game.playerHands
        : [game.playerHand];
    let totalPayout = 0;
    let hasWin = false;
    let hasPush = false;
    const dealerPoints = this.calculatePoints(game.dealerHand);
    const dealerBlackjack = this.isBlackjack(game.dealerHand);

    for (const hand of hands) {
      const { result, payout } = this.settleHand(
        game,
        hand,
        dealerPoints,
        dealerBlackjack,
      );
      totalPayout += payout;
      if (result === "win" || result === "blackjack") hasWin = true;
      if (result === "push") hasPush = true;
    }

    if (game.insuranceBet) {
      if (dealerBlackjack) {
        totalPayout += game.insuranceBet * (this.config.insurancePayout || 2);
      }
      game.insuranceBet = undefined;
    }

    game.isFinished = true;
    entity.playerHand = game.playerHand;
    entity.dealerHand = game.dealerHand;
    entity.nonce = game.nonce;
    entity.betAmount = game.betAmount;
    entity.isFinished = game.isFinished;
    entity.state = game;
    await this.blackjackRepository.save(entity);

    const finalResult = hasWin ? "win" : hasPush ? "push" : "lose";

    return {
      dealerHand: game.dealerHand,
      result: finalResult,
      payout: totalPayout,
    };
  }

  async split(
    blackjackSplitDto: BlackjackSplitDto,
    traceId: string,
  ): Promise<{ playerHands: string[][]; currentHandIndex: number }> {
    const gameId = blackjackSplitDto.gameId;
    const entity = await this.blackjackRepository.findOne({
      where: { gameId },
    });
    const game = entity?.state as GameState | undefined;
    if (!entity || !game || entity.isFinished) {
      throw new Error("Game not found or finished");
    }
    if (game.playerHands && game.playerHands.length > 1) {
      throw new Error("Already split");
    }
    const hand = game.playerHands
      ? game.playerHands[game.currentHandIndex || 0]
      : game.playerHand;
    if (hand.length !== 2 || hand[0].slice(0, -1) !== hand[1].slice(0, -1)) {
      throw new Error("Cannot split");
    }
    const secondCard = hand.pop()!;
    const firstHand = [hand[0], this.drawCard(game)];
    const secondHand = [secondCard, this.drawCard(game)];
    game.playerHands = [firstHand, secondHand];
    game.currentHandIndex = 0;
    game.playerHand = firstHand;
    entity.playerHand = game.playerHand;
    entity.dealerHand = game.dealerHand;
    entity.betAmount = game.betAmount;
    entity.nonce = game.nonce;
    entity.isFinished = game.isFinished;
    entity.state = game;
    await this.blackjackRepository.save(entity);
    return {
      playerHands: game.playerHands,
      currentHandIndex: game.currentHandIndex,
    };
  }

  async double(
    blackjackDoubleDto: BlackjackDoubleDto,
    traceId: string,
  ): Promise<{
    card: string;
    playerHand: string[];
    gameOver: boolean;
    betAmount: number;
  }> {
    const gameId = blackjackDoubleDto.gameId;
    const entity = await this.blackjackRepository.findOne({
      where: { gameId },
    });
    const game = entity?.state as GameState | undefined;
    if (!entity || !game || entity.isFinished) {
      throw new Error("Game not found or finished");
    }
    const hand = game.playerHands
      ? game.playerHands[game.currentHandIndex || 0]
      : game.playerHand;
    if (hand.length !== 2) {
      throw new Error("Double only available after first two cards");
    }
    const card = this.drawCard(game);
    hand.push(card);
    game.doubleDown = true;
    game.betAmount *= 2;
    if (game.playerHands) {
      game.playerHands[game.currentHandIndex || 0] = hand;
    }
    game.playerHand = hand;
    entity.playerHand = game.playerHand;
    entity.dealerHand = game.dealerHand;
    entity.betAmount = game.betAmount;
    entity.nonce = game.nonce;
    entity.isFinished = game.isFinished;
    entity.state = game;
    await this.blackjackRepository.save(entity);
    await this.stand({ gameId }, traceId);
    return {
      card,
      playerHand: hand,
      gameOver: true,
      betAmount: game.betAmount,
    };
  }

  async insurance(
    blackjackInsuranceDto: BlackjackInsuranceDto,
    traceId: string,
  ): Promise<{ payout: number; dealerHand: string[] }> {
    const gameId = blackjackInsuranceDto.gameId;
    const entity = await this.blackjackRepository.findOne({
      where: { gameId },
    });
    const game = entity?.state as GameState | undefined;
    if (!entity || !game || entity.isFinished) {
      throw new Error("Game not found or finished");
    }
    if (!game.dealerHand[0].startsWith("A")) {
      throw new Error("Insurance not available");
    }
    if (game.insuranceBet) {
      throw new Error("Insurance already taken");
    }
    game.insuranceBet = game.betAmount / 2;
    entity.playerHand = game.playerHand;
    entity.dealerHand = game.dealerHand;
    entity.betAmount = game.betAmount;
    entity.nonce = game.nonce;
    entity.isFinished = game.isFinished;
    entity.state = game;
    await this.blackjackRepository.save(entity);
    return { payout: 0, dealerHand: game.dealerHand };
  }

  async getConfig(
    blackjackConfigRequestDto: BlackjackConfigRequestDto,
    traceId: string,
  ): Promise<BlackjackGameConfigDto> {
    return this.config;
  }

  async getProvablyFairData(
    blackjackProvablyFairRequestDto: BlackjackProvablyFairRequestDto,
    traceId: string,
  ): Promise<BlackjackProvablyFairDto> {
    const gameId = blackjackProvablyFairRequestDto.gameId;
    const entity = await this.blackjackRepository.findOne({
      where: { gameId },
    });
    const game = entity?.state as GameState | undefined;
    if (!entity || !game) throw new Error("Game not found");
    return {
      serverSeedHash: game.serverSeedHash,
      serverSeed: game.serverSeed,
      clientSeed: game.clientSeed || "",
      nonceMap: [game.nonce],
    };
  }

  private settleHand(
    game: GameState,
    hand: string[],
    dealerPoints: number,
    dealerBlackjack: boolean,
  ): { result: string; payout: number } {
    const bet = game.betAmount;
    const playerPoints = this.calculatePoints(hand);
    const playerBlackjack = this.isBlackjack(hand);

    let result = "push";
    let payout = 0;

    if (this.isBust(hand)) {
      result = "lose";
    } else if (playerBlackjack && !dealerBlackjack) {
      result = "win";
      payout = bet * (1 + (this.config.blackjackPayout || 1.5));
    } else if (dealerBlackjack && !playerBlackjack) {
      result = "lose";
    } else if (dealerBlackjack && playerBlackjack) {
      result = "push";
      payout = bet;
    } else if (!this.isBust(game.dealerHand)) {
      if (dealerPoints > playerPoints) {
        result = "lose";
      } else if (dealerPoints < playerPoints) {
        result = "win";
        payout = bet * (1 + (this.config.winPayout || 1));
      } else {
        result = "push";
        payout = bet;
      }
    } else {
      result = "win";
      payout = bet * (1 + (this.config.winPayout || 1));
    }

    return { result, payout };
  }

  private calculateAllValues(cards: string[]): number[] {
    let sums = [0];
    for (const card of cards) {
      const rank = card.slice(0, -1);
      const value = ["J", "Q", "K"].includes(rank)
        ? 10
        : rank === "A"
          ? [1, 11]
          : parseInt(rank, 10);

      if (Array.isArray(value)) {
        const temp: number[] = [];
        for (const sum of sums) {
          temp.push(sum + value[0]);
          temp.push(sum + value[1]);
        }
        sums = temp;
      } else {
        sums = sums.map((s) => s + value);
      }
    }
    return sums;
  }

  private calculatePoints(hand: string[]): number {
    const totals = this.calculateAllValues(hand).filter((t) => t <= 21);
    if (totals.length === 0) {
      return Math.min(...this.calculateAllValues(hand));
    }
    return Math.max(...totals);
  }

  private isBlackjack(hand: string[]): boolean {
    return hand.length === 2 && this.calculatePoints(hand) === 21;
  }

  private isBust(hand: string[]): boolean {
    return this.calculatePoints(hand) > 21;
  }

  private isSoft17(hand: string[]): boolean {
    const totals = this.calculateAllValues(hand);
    return totals.includes(17) && totals.includes(7);
  }

  private dealerTurn(game: GameState) {
    while (true) {
      const value = this.calculatePoints(game.dealerHand);
      if (value > 21) break;
      if (value < 17) {
        game.dealerHand.push(this.drawCard(game));
        continue;
      }
      if (
        value === 17 &&
        !this.config.dealerStandSoft17 &&
        this.isSoft17(game.dealerHand)
      ) {
        game.dealerHand.push(this.drawCard(game));
        continue;
      }
      break;
    }
  }
}
