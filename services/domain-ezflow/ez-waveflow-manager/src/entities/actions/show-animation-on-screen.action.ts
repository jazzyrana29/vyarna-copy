import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('ShowAnimationOnScreen')
export class ShowAnimationOnScreen extends Action {
  @Column({ type: 'varchar', length: 100, nullable: true })
  animationName?: string;

  @Column({ type: 'text', nullable: true })
  configuration?: string;
}
