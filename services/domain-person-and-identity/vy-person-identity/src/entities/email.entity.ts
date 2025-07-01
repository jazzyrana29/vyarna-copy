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
import { IsUUID, IsEmail, IsBoolean } from "class-validator";
import { Person } from "./person.entity";

@Entity("email", { schema: process.env.TIDB_DATABASE })
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  emailId: string;

  @Column("uuid")
  @IsUUID()
  @Index()
  personId: string;

  @ManyToOne(() => Person, (p) => p.emails, { onDelete: "CASCADE" })
  @JoinColumn({ name: "personId" })
  person: Person;

  @Column({ type: "varchar", length: 255, unique: true })
  @IsEmail()
  @Index()
  email: string;

  @Column({ default: false })
  @IsBoolean()
  isVerified: boolean;

  @Column({ default: false })
  @IsBoolean()
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
