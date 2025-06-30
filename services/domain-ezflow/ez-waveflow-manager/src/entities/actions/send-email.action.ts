import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('SendEmail')
export class SendEmail extends Action {
  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subject?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  body?: string;
}
