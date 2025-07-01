// src/entities/ZtrackingPerson.ts
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("ztracking_person", { schema: process.env.TIDB_DATABASE })
export class ZtrackingPerson extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  ztrackingVersion: string;

  @Index()
  @Column("uuid")
  personId: string;

  @Column("uuid", { nullable: true })
  rootBusinessUnitId: string;

  @Column({ type: "varchar", length: 50 })
  @Index()
  username: string;

  @Column({ type: "varchar", length: 50 })
  @Index()
  nameFirst: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  @Index()
  nameMiddle: string;

  @Column({ type: "varchar", length: 50 })
  @Index()
  nameLastFirst: string;

  @Column({ type: "varchar", length: 50 })
  @Index()
  nameLastSecond: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Index()
  @Column()
  versionDate: Date;
}
