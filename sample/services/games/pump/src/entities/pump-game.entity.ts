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

@Entity("pump_games", { schema: process.env.TIDB_DATABASE })
export class PumpGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  roundId: string;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column("varchar")
  riskLevel: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar", { nullable: true })
  variant?: string;

  @Column("varchar", { nullable: true })
  clientSeed?: string;

  @Column("int", { default: 0 })
  pumpsDone: number;

  @Column("boolean", { default: false })
  burst: boolean;

  @Column("float")
  popThreshold: number;

  @Column("simple-array", { nullable: true })
  nonceMap: string[];

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
