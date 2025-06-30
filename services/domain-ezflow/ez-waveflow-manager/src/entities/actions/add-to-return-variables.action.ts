import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('AddToReturnVariables')
export class AddToReturnVariables extends Action {
  @Column({
    type: 'json',
    nullable: false,
  })
  returnVariables: Record<string, any>;
}
