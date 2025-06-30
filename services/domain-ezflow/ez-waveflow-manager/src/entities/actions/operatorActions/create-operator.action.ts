import { ChildEntity, Column } from 'typeorm';
import { Action } from '../../action.entity';

@ChildEntity('CreateOperator')
export class CreateOperator extends Action {
  @Column('uuid', { nullable: true })
  businessUnitId?: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  nameFirst: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nameMiddle?: string;

  @Column({ type: 'varchar', length: 100 })
  nameLast: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  _updatedBy?: string;
}
