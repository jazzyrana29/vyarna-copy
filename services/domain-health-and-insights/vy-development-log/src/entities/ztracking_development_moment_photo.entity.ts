import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_development_moment_photo', { schema: process.env.TIDB_DATABASE })
export class ZtrackingDevelopmentMomentPhoto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  photoId: string;

  @Column('uuid')
  momentId: string;

  @Column('text')
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  caption?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
