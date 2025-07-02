import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsUUID } from "class-validator";
import { DartsGame } from "./darts-game.entity";

@Entity("dart_throws", { schema: process.env.TIDB_DATABASE })
export class DartThrow extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  throwId: string;

  @Column("uuid")
  @Index()
  gameId: string;

  @ManyToOne(() => DartsGame, (g) => g.throws)
  @JoinColumn({ name: "gameId" })
  game: DartsGame;

  @Column("int")
  turn: number;

  @Column("decimal", { precision: 12, scale: 2 })
  multiplier: number;

  @Column("bool")
  hit: boolean;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
