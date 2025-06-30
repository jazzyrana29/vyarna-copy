import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_operator_permission_profiles', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingOperatorPermissionProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  ztrackingVersion: number;

  @Column('uuid')
  operatorId: string;

  @Column('uuid')
  permissionProfileId: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
