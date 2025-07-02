import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { IsUUID } from "class-validator";
import { CryptoTransformer } from "../utils/crypto.transformer";

@Entity("mines_games", { schema: process.env.TIDB_DATABASE })
export class MinesGame extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  gameId: string;

  @Column("uuid")
  operatorId: string;

  @Column("uuid")
  businessUnitId: string;

  @Column("varchar")
  serverSeedHash: string;

  @Column("varchar", { transformer: new CryptoTransformer() })
  serverSeed: string;

  @Column("varchar", { nullable: true })
  clientSeed?: string;

  @Column("int")
  numMines: number;

  @Column("decimal", { precision: 12, scale: 2 })
  wager: number;

  @Column("json")
  revealedTiles: number[];

  @Column({ default: 0 })
  nonce: number;

  @VersionColumn()
  version: number;

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
