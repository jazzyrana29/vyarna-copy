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
import { PhysicalAddress } from "./physicalAddress.entity";
import { Email } from "./email.entity";
import { Phone } from "./phone.entity";
import { IdentityVerification } from "./identityVerification.entity";

@Entity("person", { schema: process.env.TIDB_DATABASE })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Index()
  personId: string;

  @Column("uuid", { nullable: true })
  rootBusinessUnitId: string;

  @Column('simple-array')
  roles: string[];

  @Column({ type: "varchar", length: 50, nullable: true })
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

  @Column({ type: "varchar", length: 50, nullable: true })
  @Index()
  nameLastSecond: string;

  @OneToMany(() => Email, (e) => e.person) emails: Email[];

  @OneToMany(() => Phone, (e) => e.person) phones: Phone[];

  @OneToMany(() => PhysicalAddress, (e) => e.person)
  addresses: PhysicalAddress[];

  @OneToMany(() => IdentityVerification, (v) => v.person)
  identityVerifications: IdentityVerification[];

  @Column({ type: "varchar", length: 255, nullable: true })
  @Index()
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Index()
  stripeCustomerId?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Index()
  activeCampaignId?: string | null;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
