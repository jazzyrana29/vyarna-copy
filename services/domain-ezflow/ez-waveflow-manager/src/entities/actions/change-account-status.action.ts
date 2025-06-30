import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('ChangeAccountStatus')
export class ChangeAccountStatus extends Action {
  @Column({ type: 'varchar', length: 50, nullable: true })
  newStatus?: string;
}
