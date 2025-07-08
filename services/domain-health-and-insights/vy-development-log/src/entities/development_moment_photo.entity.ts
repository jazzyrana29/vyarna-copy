import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('development_moment_photo', { schema: process.env.TIDB_DATABASE })
export class DevelopmentMomentPhoto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  photoId: string;

  @Column('uuid')
  momentId: string;

  @Column('text')
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  caption?: string;

  @CreateDateColumn()
  createdAt: Date;
}
