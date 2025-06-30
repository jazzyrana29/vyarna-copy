import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('UpdateUserData')
export class UpdateUserData extends Action {
  @Column({ type: 'text', nullable: true })
  newUserData?: string;
}
