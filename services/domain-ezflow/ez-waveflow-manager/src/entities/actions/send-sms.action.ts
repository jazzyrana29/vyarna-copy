import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('SendSMS')
export class SendSMS extends Action {
  @Column({ type: 'varchar', length: 50, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  message?: string;
}
