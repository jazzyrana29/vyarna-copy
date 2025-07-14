// src/entities/ZtrackingPhysicalAddress.ts
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressType } from 'ez-utils';

@Entity('ztracking_physical_address', { schema: process.env.TIDB_DATABASE })
export class ZtrackingPhysicalAddress extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  addressId: string;

  @Index()
  @Column('uuid')
  personId: string;

  @Column({
    type: 'enum',
    enum: AddressType,
    default: AddressType.HOME,
  })
  @Index()
  addressType: AddressType;

  @Column({ type: 'varchar', length: 255 })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2?: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 20 })
  postalCode: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

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
