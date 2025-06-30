import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('GiveBonus')
export class GiveBonus extends Action {
  @Column({ type: 'text', nullable: true })
  bonusAmount?: string;
}
