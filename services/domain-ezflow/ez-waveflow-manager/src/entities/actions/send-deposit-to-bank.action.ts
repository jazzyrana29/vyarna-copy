import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('SendDepositToBank')
export class SendDepositToBank extends Action {
  @Column({ type: 'varchar', length: 255, nullable: true })
  bankAccount?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  amount?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionReference?: string;
}
