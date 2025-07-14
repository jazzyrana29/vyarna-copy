// src/entities/PersonPhone.ts
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
} from 'typeorm';
import { IsBoolean, IsEnum, IsPhoneNumber, IsUUID } from 'class-validator';
import { Person } from './person.entity';
import { PhoneType } from 'ez-utils';

@Entity('phone', { schema: process.env.TIDB_DATABASE })
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Index()
  phoneId: string;

  @Column('uuid')
  @IsUUID()
  @Index()
  personId: string;

  @ManyToOne(() => Person, (p) => p.phones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column({ type: 'enum', enum: PhoneType, default: PhoneType.MOBILE })
  @IsEnum(PhoneType)
  @Index()
  type: PhoneType;

  @Column({ type: 'varchar', length: 20 })
  @IsPhoneNumber(null)
  @Index()
  phoneNumber: string;

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
