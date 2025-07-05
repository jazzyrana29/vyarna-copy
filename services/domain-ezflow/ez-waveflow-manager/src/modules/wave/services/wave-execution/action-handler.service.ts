import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { AddNote } from '../../../../entities/actions/add-note.action';
import { SendEmail } from '../../../../entities/actions/send-email.action';
import { SendSMS } from '../../../../entities/actions/send-sms.action';
import { ChangeAccountStatus } from '../../../../entities/actions/change-account-status.action';
import { GiveBonus } from '../../../../entities/actions/give-bonus.action';
import { SendDepositToBank } from '../../../../entities/actions/send-deposit-to-bank.action';
import { ShowAnimationOnScreen } from '../../../../entities/actions/show-animation-on-screen.action';
import { UpdateUserData } from '../../../../entities/actions/update-user-data.action';
import { AskForKYCDocument } from '../../../../entities/actions/ask-for-kyc-document.action';
import { ApproveSignup } from '../../../../entities/actions/approve-signup.action';
import { CreateOperator } from '../../../../entities/actions/operatorActions/create-operator.action';

import { ActionDto } from 'ez-utils';
import { AddToReturnVariables } from '../../../../entities/actions/add-to-return-variables.action';
import {
  ActionResult,
  ActionType,
  AllOutputs,
  OutputsOf,
} from '../../../../utils/actionsTypes.data';

@Injectable()
export class ActionHandlerService {
  private logger = getLoggerConfig(ActionHandlerService.name);

  constructor() {
    this.logger.debug(
      `${ActionHandlerService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  /**
   * Performs the execution of a given action.
   * @param action - The action entity (could be any of the child entities).
   * @param waveContext - Context object with data needed for the action execution.
   * @param traceId - ID used for logging/tracking.
   * @returns Whether the action execution was successful.
   */
  public async performActionExecution<T extends ActionType>(
    action: ActionDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<AllOutputs>> {
    if (!action) {
      this.logger.error(
        'No action provided to performActionExecution og ActionType',
        traceId,
        'performActionExecution',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }

    this.logger.info(
      `Performing action of type: ${action.actionType}`,
      traceId,
      'performActionExecution',
      LogStreamLevel.DebugLight,
    );

    try {
      let result: ActionResult<AllOutputs>;
      switch (action.actionType) {
        case 'AddToReturnVariables':
          result = await this.handleAddToReturnVariables(
            action as AddToReturnVariables,
            waveContext,
            traceId,
          );
          break;
        case 'AddNote':
          result = await this.handleAddNote(
            action as AddNote,
            waveContext,
            traceId,
          );
          break;
        case 'SendEmail':
          result = await this.handleSendEmail(
            action as SendEmail,
            waveContext,
            traceId,
          );
          break;
        case 'SendSMS':
          result = await this.handleSendSMS(
            action as SendSMS,
            waveContext,
            traceId,
          );
          break;
        case 'ChangeAccountStatus':
          result = await this.handleChangeAccountStatus(
            action as ChangeAccountStatus,
            waveContext,
            traceId,
          );
          break;
        case 'GiveBonus':
          result = await this.handleGiveBonus(
            action as GiveBonus,
            waveContext,
            traceId,
          );
          break;
        case 'SendDepositToBank':
          result = await this.handleSendDepositToBank(
            action as SendDepositToBank,
            waveContext,
            traceId,
          );
          break;
        case 'ShowAnimationOnScreen':
          result = await this.handleShowAnimationOnScreen(
            action as ShowAnimationOnScreen,
            waveContext,
            traceId,
          );
          break;
        case 'UpdateUserData':
          result = await this.handleUpdateUserData(
            action as UpdateUserData,
            waveContext,
            traceId,
          );
          break;
        case 'AskForKYCDocument':
          result = await this.handleAskForKYCDocument(
            action as AskForKYCDocument,
            waveContext,
            traceId,
          );
          break;
        case 'ApproveSignup':
          result = await this.handleApproveSignup(
            action as ApproveSignup,
            waveContext,
            traceId,
          );
          break;
        case 'CreateOperator':
          result = await this.handleCreateOperator(
            action as CreateOperator,
            waveContext,
            traceId,
          );
          break;
        default:
          this.logger.error(
            `Unsupported action type: ${action.actionType}`,
            traceId,
            'performActionExecution',
            LogStreamLevel.DebugHeavy,
          );
          result = { success: false, outputs: {} };
      }

      waveContext.priorOutputs = {
        ...(waveContext.priorOutputs || {}),
        ...result.outputs,
      };
      waveContext.inputVariables = {
        ...waveContext.inputVariables,
        ...waveContext.priorOutputs,
      };
      return result;
    } catch (error) {
      this.logger.error(
        `Error performing action execution: ${error.message}`,
        traceId,
        'performActionExecution',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Simple template substitution using flat inputs map.
   */
  private substituteTemplate(
    template: string,
    inputVariables: Record<string, any>,
  ): string {
    return template.replace(/{{\s*(\w+)\s*}}/g, (match, name) =>
      inputVariables[name] !== undefined ? String(inputVariables[name]) : match,
    );
  }

  /**
   * Handler for the AddToReturnVariables action.
   * Applies template substitution, returns outputs,
   * and adds them to waveContext.returnVariables.
   */
  private async handleAddToReturnVariables(
    action: AddToReturnVariables,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'AddToReturnVariables'>>> {
    try {
      const outputs: OutputsOf<'AddToReturnVariables'> = {};

      // 1) Guard against null/undefined returnVariables
      const incomingVars: Record<string, any> = action.returnVariables ?? {};

      for (const [key, rawValue] of Object.entries(incomingVars)) {
        let processed = rawValue;
        if (typeof rawValue === 'string') {
          processed = this.substituteTemplate(
            rawValue,
            waveContext.inputVariables,
          );
        }
        outputs[key] = processed;
      }

      // 2) Log
      this.logger.info(
        `Executing AddToReturnVariables. Outputs: ${JSON.stringify(outputs)}`,
        traceId,
        'handleAddToReturnVariables',
        LogStreamLevel.ProdStandard,
      );

      // 3) Ensure waveContext.returnVariables exists and merge
      waveContext.returnVariables = {
        ...(waveContext.returnVariables ?? {}),
        ...outputs,
      };

      return { success: true, outputs };
    } catch (error) {
      this.logger.error(
        `Error in handleAddToReturnVariables: ${error.message}`,
        traceId,
        'handleAddToReturnVariables',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Example handler for AddNote action.
   */
  private async handleAddNote(
    action: AddNote,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'AddNote'>>> {
    try {
      let noteToStore: string | undefined = action.note;
      if (noteToStore) {
        noteToStore = this.substituteTemplate(
          noteToStore,
          waveContext.inputVariables,
        );
        this.logger.info(
          `Executing AddNote action. Note after substitution: ${noteToStore}`,
          traceId,
          'handleAddNote',
          LogStreamLevel.ProdStandard,
        );
      } else {
        this.logger.info(
          'Executing AddNote action. No note provided.',
          traceId,
          'handleAddNote',
          LogStreamLevel.ProdStandard,
        );
      }
      return {
        success: true,
        outputs: { storedNote: noteToStore },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleAddNote: ${error.message}`,
        traceId,
        'handleAddNote',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for SendEmail action.
   */
  private async handleSendEmail(
    action: SendEmail,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'SendEmail'>>> {
    try {
      const email = action.email
        ? this.substituteTemplate(action.email, waveContext.inputVariables)
        : 'No email';
      const subject = action.subject
        ? this.substituteTemplate(action.subject, waveContext.inputVariables)
        : 'No subject';
      const body = action.body
        ? this.substituteTemplate(action.body, waveContext.inputVariables)
        : 'No body';

      this.logger.info(
        `Executing SendEmail action. Email: ${email}, Subject: ${subject}, Body: ${body}`,
        traceId,
        'handleSendEmail',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Implement actual email sending…

      return {
        success: true,
        outputs: { emailSentTo: email, emailSubject: subject, emailBody: body },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleSendEmail: ${error.message}`,
        traceId,
        'handleSendEmail',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for SendSMS action.
   */
  private async handleSendSMS(
    action: SendSMS,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'SendSMS'>>> {
    try {
      const phoneNumber = action.phoneNumber
        ? this.substituteTemplate(
            action.phoneNumber,
            waveContext.inputVariables,
          )
        : 'N/A';
      const message = action.message
        ? this.substituteTemplate(action.message, waveContext.inputVariables)
        : 'N/A';

      this.logger.info(
        `Executing SendSMS action. PhoneNumber: ${phoneNumber}, Message: ${message}`,
        traceId,
        'handleSendSMS',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Implement actual SMS sending…

      return {
        success: true,
        outputs: { smsTo: phoneNumber, smsMessage: message },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleSendSMS: ${error.message}`,
        traceId,
        'handleSendSMS',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for ChangeAccountStatus action.
   */
  private async handleChangeAccountStatus(
    action: ChangeAccountStatus,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'ChangeAccountStatus'>>> {
    try {
      const newStatus = action.newStatus
        ? this.substituteTemplate(action.newStatus, waveContext.inputVariables)
        : 'No status provided';

      this.logger.info(
        `Executing ChangeAccountStatus action. New Status: ${newStatus}`,
        traceId,
        'handleChangeAccountStatus',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Persist status change…

      return {
        success: true,
        outputs: { accountStatus: newStatus },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleChangeAccountStatus: ${error.message}`,
        traceId,
        'handleChangeAccountStatus',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for GiveBonus action.
   */
  private async handleGiveBonus(
    action: GiveBonus,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'GiveBonus'>>> {
    try {
      const bonusAmount = action.bonusAmount
        ? this.substituteTemplate(
            action.bonusAmount,
            waveContext.inputVariables,
          )
        : '0';

      this.logger.info(
        `Executing GiveBonus action. Bonus Amount: ${bonusAmount}`,
        traceId,
        'handleGiveBonus',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Apply bonus…

      return {
        success: true,
        outputs: { bonusAmountGiven: bonusAmount },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleGiveBonus: ${error.message}`,
        traceId,
        'handleGiveBonus',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for SendDepositToBank action.
   */
  private async handleSendDepositToBank(
    action: SendDepositToBank,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'SendDepositToBank'>>> {
    try {
      const bankAccount = action.bankAccount
        ? this.substituteTemplate(
            action.bankAccount,
            waveContext.inputVariables,
          )
        : 'N/A';
      const amount = action.amount
        ? this.substituteTemplate(action.amount, waveContext.inputVariables)
        : 'N/A';
      const transactionReference = action.transactionReference
        ? this.substituteTemplate(
            action.transactionReference,
            waveContext.inputVariables,
          )
        : 'N/A';

      this.logger.info(
        `Executing SendDepositToBank. Account: ${bankAccount}, Amount: ${amount}, TxRef: ${transactionReference}`,
        traceId,
        'handleSendDepositToBank',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Process deposit…

      return {
        success: true,
        outputs: {
          depositAccount: bankAccount,
          depositAmount: amount,
          depositTxRef: transactionReference,
        },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleSendDepositToBank: ${error.message}`,
        traceId,
        'handleSendDepositToBank',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for ShowAnimationOnScreen action.
   */
  private async handleShowAnimationOnScreen(
    action: ShowAnimationOnScreen,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'ShowAnimationOnScreen'>>> {
    try {
      const animationName = action.animationName
        ? this.substituteTemplate(
            action.animationName,
            waveContext.inputVariables,
          )
        : 'N/A';
      const configuration = action.configuration
        ? this.substituteTemplate(
            action.configuration,
            waveContext.inputVariables,
          )
        : 'N/A';

      this.logger.info(
        `Executing ShowAnimationOnScreen. Name: ${animationName}, Config: ${configuration}`,
        traceId,
        'handleShowAnimationOnScreen',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Display animation…

      return {
        success: true,
        outputs: { animation: animationName, animationConfig: configuration },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleShowAnimationOnScreen: ${error.message}`,
        traceId,
        'handleShowAnimationOnScreen',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for UpdateUserData action.
   */
  private async handleUpdateUserData(
    action: UpdateUserData,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'UpdateUserData'>>> {
    try {
      const newUserData = action.newUserData
        ? this.substituteTemplate(
            action.newUserData,
            waveContext.inputVariables,
          )
        : 'N/A';

      this.logger.info(
        `Executing UpdateUserData. Data: ${newUserData}`,
        traceId,
        'handleUpdateUserData',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Update user record…

      return {
        success: true,
        outputs: { updatedUserData: newUserData },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleUpdateUserData: ${error.message}`,
        traceId,
        'handleUpdateUserData',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for AskForKYCDocument action.
   */
  private async handleAskForKYCDocument(
    action: AskForKYCDocument,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'AskForKYCDocument'>>> {
    try {
      const documentType = action.documentType
        ? this.substituteTemplate(
            action.documentType,
            waveContext.inputVariables,
          )
        : 'N/A';
      const instructions = action.instructions
        ? this.substituteTemplate(
            action.instructions,
            waveContext.inputVariables,
          )
        : 'N/A';

      this.logger.info(
        `Executing AskForKYCDocument. Type: ${documentType}, Instructions: ${instructions}`,
        traceId,
        'handleAskForKYCDocument',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Trigger KYC flow…

      return {
        success: true,
        outputs: { requestedDoc: documentType, kycInstructions: instructions },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleAskForKYCDocument: ${error.message}`,
        traceId,
        'handleAskForKYCDocument',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for ApproveSignup action.
   */
  private async handleApproveSignup(
    action: ApproveSignup,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'ApproveSignup'>>> {
    try {
      const approved = action.approved
        ? this.substituteTemplate(action.approved, waveContext.inputVariables)
        : 'true';

      this.logger.info(
        `Executing ApproveSignup. Approved: ${approved}`,
        traceId,
        'handleApproveSignup',
        LogStreamLevel.ProdStandard,
      );
      // TODO: Finalize signup…

      return {
        success: true,
        outputs: { signupApproved: approved === 'true' },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleApproveSignup: ${error.message}`,
        traceId,
        'handleApproveSignup',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }

  /**
   * Handler for CreateOperator action.
   */
  private async handleCreateOperator(
    action: CreateOperator,
    waveContext: any,
    traceId: string,
  ): Promise<ActionResult<OutputsOf<'CreateOperator'>>> {
    try {
      const businessUnitId = action.businessUnitId
        ? this.substituteTemplate(
            action.businessUnitId,
            waveContext.inputVariables,
          )
        : undefined;
      const username = this.substituteTemplate(
        action.username,
        waveContext.inputVariables,
      );
      const nameFirst = this.substituteTemplate(
        action.nameFirst,
        waveContext.inputVariables,
      );
      const nameMiddle = action.nameMiddle
        ? this.substituteTemplate(action.nameMiddle, waveContext.inputVariables)
        : undefined;
      const nameLast = this.substituteTemplate(
        action.nameLast,
        waveContext.inputVariables,
      );
      const email = this.substituteTemplate(
        action.email,
        waveContext.inputVariables,
      );
      // const password = this.substituteTemplate(
      //   action.password,
      //   waveContext.inputVariables,
      // );
      const updatedBy = action._updatedBy
        ? this.substituteTemplate(action._updatedBy, waveContext.inputVariables)
        : undefined;

      this.logger.info(
        `Executing CreateOperator action. businessUnitId=${businessUnitId}, username=${username}, nameFirst=${nameFirst}, nameMiddle=${nameMiddle}, nameLast=${nameLast}, email=${email}, updatedBy=${updatedBy}`,
        traceId,
        'handleCreateOperator',
        LogStreamLevel.ProdStandard,
      );

      // TODO: Implement actual operator creation (e.g. call your OperatorService or repository)
      // const operator = await this.operatorService.create({
      //   businessUnitId,
      //   username,
      //   nameFirst,
      //   nameMiddle,
      //   nameLast,
      //   email,
      //   password,
      //   updatedBy: _updatedBy,
      // });

      // For now, just echoing back the inputs as outputs
      return {
        success: true,
        outputs: {
          businessUnitId,
          username,
          nameFirst,
          nameMiddle,
          nameLast,
          email,
          updatedBy,
        },
      };
    } catch (error) {
      this.logger.error(
        `Error in handleCreateOperator: ${error.message}`,
        traceId,
        'handleCreateOperator',
        LogStreamLevel.DebugHeavy,
      );
      return { success: false, outputs: {} };
    }
  }
}
