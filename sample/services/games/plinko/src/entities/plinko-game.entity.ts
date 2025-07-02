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

@Entity("plinko_games", { schema: process.env.TIDB_DATABASE })
export class PlinkoGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  gameId: string;

  @Column("uuid", { nullable: true })
  operatorId?: string;

  @Column("uuid", { nullable: true })
  businessUnitId?: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar", { nullable: true })
  clientSeed?: string;

  @Column("int")
  rows: number;

  @Column("varchar")
  riskLevel: string;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column("json")
  path: number[];

  @Column("varchar", { nullable: true })
  variant?: string;

  @Column("boolean", { default: false })
  shieldActive: boolean;

  @Column("boolean", { default: false })
  isCompleted: boolean;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
