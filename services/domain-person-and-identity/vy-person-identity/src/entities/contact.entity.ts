import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUUID, IsString, IsEmail } from 'class-validator';

@Entity('contact', { schema: process.env.TIDB_DATABASE })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Index()
  contactId: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  stripeCustomerId?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  activeCampaignId?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
