// src/entities/ZtrackingEmail.ts
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("ztracking_email", { schema: process.env.TIDB_DATABASE })
export class ZtrackingEmail extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  ztrackingVersion: string;

  @Index()
  @Column("uuid")
  emailId: string;

  @Index()
  @Column("uuid")
  personId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Index()
  email: string;

  @Column({  nullable: true })
  isVerified: boolean;

  @Column({  nullable: true })
  isPrimary: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Index()
  @Column({ nullable: true })
  versionDate: Date;
}
