import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('ApproveSignup')
export class ApproveSignup extends Action {
  @Column({ type: 'varchar', length: 50, nullable: true, default: 'true' })
  approved: string;
}
