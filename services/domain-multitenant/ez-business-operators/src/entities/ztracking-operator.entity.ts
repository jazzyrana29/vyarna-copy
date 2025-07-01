import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_operators', { schema: process.env.TIDB_DATABASE })
export class ZtrackingOperator extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  operatorId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  login: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameFirst: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameMiddle: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  nameLast: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  email: string;

  @Column('uuid', { nullable: true })
  businessUnitId: string;

  @Column({ nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
