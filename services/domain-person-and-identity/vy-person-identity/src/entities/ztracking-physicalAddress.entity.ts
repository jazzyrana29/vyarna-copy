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
    default: AddressType.HOME,nullable: true
  })
  @Index()
  addressType: AddressType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2?: string;

  @Column({ type: 'varchar', length: 100,nullable: true  })
  city: string;

  @Column({ type: 'varchar', length: 100,nullable: true  })
  state: string;

  @Column({ type: 'varchar', length: 20,nullable: true  })
  postalCode: string;

  @Column({ type: 'varchar', length: 100,nullable: true  })
  country: string;

  @Column({ nullable: true })
  isPrimary: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Index()
  @Column({ nullable: true })
  versionDate: Date;
}
