import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsUUID, IsString } from 'class-validator';
import { IdentityVerification } from './identityVerification.entity';

@Entity('document', { schema: process.env.TIDB_DATABASE })
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Index()
  documentId: string;

  @Column('uuid')
  @IsUUID()
  @Index()
  verificationId: string;

  @ManyToOne(() => IdentityVerification, (v) => v.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'verificationId' })
  verification: IdentityVerification;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  type: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  url: string;

  @CreateDateColumn()
  uploadedAt: Date;
}
