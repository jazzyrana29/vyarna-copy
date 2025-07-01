// src/entities/PersonAddress.ts
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
  import { IsUUID, IsBoolean, Length } from 'class-validator';
  import { Person } from './person.entity';

  export enum AddressType {
    HOME      = 'HOME',
    WORK      = 'WORK',
    BILLING   = 'BILLING',
    SHIPPING  = 'SHIPPING',
  }
  
  @Entity('physical_address', { schema: process.env.TIDB_DATABASE })
  export class PhysicalAddress extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    @Index()
    addressId: string;
  
    @Column('uuid')
    @IsUUID()
    @Index()
    personId: string;
  
    @ManyToOne(() => Person, (p) => p.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'personId' })
    person: Person;

    @Column({
      type: 'enum',
      enum: AddressType,
      default: AddressType.HOME,
    })
    @Index()
    addressType: AddressType;    
  
    @Column({ type: 'varchar', length: 255 })
    @Length(1, 255)
    addressLine1: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    @Length(0, 255)
    addressLine2?: string;
  
    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    city: string;
  
    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    state: string;
  
    @Column({ type: 'varchar', length: 20 })
    @Length(1, 20)
    postalCode: string;
  
    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    country: string;
  
    @Column({ default: false })
    @IsBoolean()
    isPrimary: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  