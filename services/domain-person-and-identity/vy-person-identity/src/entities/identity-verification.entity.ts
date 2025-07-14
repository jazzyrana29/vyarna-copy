import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEnum, IsUUID } from 'class-validator';
import { Person } from './person.entity';
import { Document } from './document.entity';
import { VerificationStatus } from 'ez-utils';

@Entity('identity_verification', { schema: process.env.TIDB_DATABASE })
export class IdentityVerification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Index()
  verificationId: string;

  @Column('uuid')
  @IsUUID()
  @Index()
  personId: string;

  @ManyToOne(() => Person, (p) => p.identityVerifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  @IsEnum(VerificationStatus)
  @Index()
  status: VerificationStatus;

  @CreateDateColumn()
  submittedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt: Date;

  @OneToMany(() => Document, (d) => d.verification, { cascade: true })
  documents: Document[];
}
