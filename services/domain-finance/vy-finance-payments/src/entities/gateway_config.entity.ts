import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('gateway_config', { schema: process.env.TIDB_DATABASE })
export class GatewayConfig extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  gatewayId: string;

  @Column({ length: 20 })
  name: 'STRIPE' | 'PAYPAL' | 'OTHER';

  @Column('json')
  credentials: Record<string, unknown>;

  @Column('boolean', { default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
