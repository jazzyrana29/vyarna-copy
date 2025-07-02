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

@Entity("dragon_tower_games", { schema: process.env.TIDB_DATABASE })
export class DragonTowerGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  gameId: string;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column({ type: "varchar", length: 20 })
  difficulty: string;

  @Column({ type: "varchar", nullable: true })
  variant?: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar")
  serverSeed: string;

  @Column("varchar", { nullable: true })
  clientSeed?: string;

  @Column("int")
  gridRows: number;

  @Column("int")
  gridColumns: number;

  @Column("json")
  revealedTiles: number[];

  @Column("int", { default: 0 })
  levelReached: number;

  @Column("decimal", { precision: 12, scale: 4, default: 1 })
  multiplier: number;

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
