import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsUUID } from "class-validator";
import { DartThrow } from "./dart-throw.entity";

@Entity("darts_games", { schema: process.env.TIDB_DATABASE })
export class DartsGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  gameId: string;

  @Column("decimal", { precision: 12, scale: 2 })
  bet: number;

  @Column({ type: "varchar", length: 20 })
  difficulty: string;

  @Column({ type: "varchar", length: 64 })
  serverSeedHash: string;

  @Column({ type: "varchar", length: 64 })
  serverSeed: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  clientSeed?: string;

  @Column({ default: 0 })
  nonce: number;

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  payout: number;

  @Column({ type: "varchar", length: 20, default: "playing" })
  status: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @OneToMany(() => DartThrow, (t) => t.game)
  throws: DartThrow[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
