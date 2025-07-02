import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsUUID } from "class-validator";
import { BlackjackGameStateDto } from "ez-utils";

@Entity("blackjack_games", { schema: process.env.TIDB_DATABASE })
export class BlackjackGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  gameId: string;

  @Column("simple-array")
  playerHand: string[];

  @Column("simple-array")
  dealerHand: string[];

  @Column("decimal", { precision: 12, scale: 2 })
  betAmount: number;

  @Column({ nullable: true })
  clientSeed?: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("int")
  nonce: number;

  @Column("json")
  state: BlackjackGameStateDto;

  @Column("int")
  decks: number;

  @Column("boolean", { default: false })
  isFinished: boolean;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { BlackjackGame as BlackjackGameEntity };
