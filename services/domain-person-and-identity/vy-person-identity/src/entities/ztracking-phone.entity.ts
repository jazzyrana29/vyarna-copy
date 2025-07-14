// src/entities/ZtrackingPhone.ts
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhoneType } from 'ez-utils';

@Entity('ztracking_phone', { schema: process.env.TIDB_DATABASE })
export class ZtrackingPhone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  phoneId: string;

  @Index()
  @Column('uuid')
  personId: string;

  @Column({ type: 'enum', enum: PhoneType, default: PhoneType.MOBILE })
  @Index()
  type: PhoneType;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Index()
  @Column()
  versionDate: Date;
}
