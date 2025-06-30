import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

import { Action } from '../../entities/action.entity';
import { ActionVariable } from '../../entities/action-variable.entity';
import { ZtrackingAction } from '../../entities/ztracking-action.entity';
import { Node } from '../../entities/node.entity';

import { SendEmail } from '../../entities/actions/send-email.action';
import { SendSMS } from '../../entities/actions/send-sms.action';
import { GiveBonus } from '../../entities/actions/give-bonus.action';
import { ChangeAccountStatus } from '../../entities/actions/change-account-status.action';
import { AddNote } from '../../entities/actions/add-note.action';
import { ApproveSignup } from '../../entities/actions/approve-signup.action';
import { AskForKYCDocument } from '../../entities/actions/ask-for-kyc-document.action';
import { SendDepositToBank } from '../../entities/actions/send-deposit-to-bank.action';
import { ShowAnimationOnScreen } from '../../entities/actions/show-animation-on-screen.action';
import { UpdateUserData } from '../../entities/actions/update-user-data.action';
import { CreateOperator } from '../../entities/actions/operatorActions/create-operator.action';

import { ActionService } from './services/action.service';
import { ActionKafkaService } from './services/action-kafka.service';
import { ZtrackingActionService } from './services/ztracking-action.service';

import { ActionController } from './action.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Node,
      Action,
      SendEmail,
      SendSMS,
      GiveBonus,
      ChangeAccountStatus,
      AddNote,
      ApproveSignup,
      AskForKYCDocument,
      SendDepositToBank,
      ShowAnimationOnScreen,
      UpdateUserData,
      CreateOperator,
      ActionVariable,
      ZtrackingAction,
    ]),
  ],
  controllers: [ActionController],
  providers: [ActionService, ActionKafkaService, ZtrackingActionService],
})
export class ActionModule {
  private logger = getLoggerConfig(ActionModule.name);

  constructor() {
    this.logger.debug(
      `${ActionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
