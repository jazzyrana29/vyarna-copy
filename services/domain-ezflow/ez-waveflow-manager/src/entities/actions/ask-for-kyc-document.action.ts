import { ChildEntity, Column } from 'typeorm';
import { Action } from '../action.entity';

@ChildEntity('AskForKYCDocument')
export class AskForKYCDocument extends Action {
  @Column({ type: 'varchar', length: 255, nullable: true })
  documentType?: string;

  @Column({ type: 'text', nullable: true })
  instructions?: string;
}
