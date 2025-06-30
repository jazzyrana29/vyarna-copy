import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('AddNote')
export class AddNote extends Action {
  @Column({ type: 'varchar', length: 500, nullable: true })
  note?: string;
}
