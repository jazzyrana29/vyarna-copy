// Successful result with a set of outputs T
interface SuccessResult<T> {
  success: true;
  outputs: T;
}

// Failed result: should never include outputs
interface FailureResult {
  success: false;
  outputs: {};
}

// Generic: if success is true, outputs is T; if false, outputs is {}
export type ActionResult<T> = SuccessResult<T> | FailureResult;

// 1. AddToReturnVariables
export type AddToReturnVariablesOutputs = Record<string, any>;

// 2. AddNote
export type AddNoteOutputs = {
  storedNote: string | undefined;
};

// 3. SendEmail
export type SendEmailOutputs = {
  emailSentTo: string;
  emailSubject: string;
  emailBody: string;
};

// 4. SendSMS
export type SendSMSOutputs = {
  smsTo: string;
  smsMessage: string;
};

// 5. ChangeAccountStatus
export type ChangeAccountStatusOutputs = {
  accountStatus: string;
};

// 6. GiveBonus
export type GiveBonusOutputs = {
  bonusAmountGiven: string;
};

// 7. SendDepositToBank
export type SendDepositToBankOutputs = {
  depositAccount: string;
  depositAmount: string;
  depositTxRef: string;
};

// 8. ShowAnimationOnScreen
export type ShowAnimationOnScreenOutputs = {
  animation: string;
  animationConfig: string;
};

// 9. UpdateUserData
export type UpdateUserDataOutputs = {
  updatedUserData: string;
};

// 10. AskForKYCDocument
export type AskForKYCDocumentOutputs = {
  requestedDoc: string;
  kycInstructions: string;
};

// 11. ApproveSignup
export type ApproveSignupOutputs = {
  signupApproved: boolean;
};

// 12. CreateOperator
export type CreateOperatorOutputs = {
  businessUnitId: string;
  username: string;
  nameFirst: string;
  nameMiddle: string;
  nameLast: string;
  email: string;
  updatedBy: string;
};

export interface HandlerOutputMap {
  AddToReturnVariables: AddToReturnVariablesOutputs;
  AddNote: AddNoteOutputs;
  SendEmail: SendEmailOutputs;
  SendSMS: SendSMSOutputs;
  ChangeAccountStatus: ChangeAccountStatusOutputs;
  GiveBonus: GiveBonusOutputs;
  SendDepositToBank: SendDepositToBankOutputs;
  ShowAnimationOnScreen: ShowAnimationOnScreenOutputs;
  UpdateUserData: UpdateUserDataOutputs;
  AskForKYCDocument: AskForKYCDocumentOutputs;
  ApproveSignup: ApproveSignupOutputs;
  CreateOperator: CreateOperatorOutputs;
}

export type AllOutputs = HandlerOutputMap[keyof HandlerOutputMap];

export type ActionType = keyof HandlerOutputMap;

export type OutputsOf<T extends ActionType> = HandlerOutputMap[T];

export const ACTION_OUTPUTS: Record<
  ActionType,
  { propertyName: string; type: string }[]
> = {
  AddToReturnVariables: [{ propertyName: 'foo', type: 'any' }],
  AddNote: [{ propertyName: 'storedNote', type: 'string' }],
  SendEmail: [
    { propertyName: 'emailSentTo', type: 'string' },
    { propertyName: 'emailSubject', type: 'string' },
    { propertyName: 'emailBody', type: 'string' },
  ],
  SendSMS: [
    { propertyName: 'smsTo', type: 'string' },
    { propertyName: 'smsMessage', type: 'string' },
  ],
  ChangeAccountStatus: [{ propertyName: 'accountStatus', type: 'string' }],
  GiveBonus: [{ propertyName: 'bonusAmountGiven', type: 'string' }],
  SendDepositToBank: [
    { propertyName: 'depositAccount', type: 'string' },
    { propertyName: 'depositAmount', type: 'string' },
    { propertyName: 'depositTxRef', type: 'string' },
  ],
  ShowAnimationOnScreen: [
    { propertyName: 'animation', type: 'string' },
    { propertyName: 'animationConfig', type: 'string' },
  ],
  UpdateUserData: [{ propertyName: 'updatedUserData', type: 'string' }],
  AskForKYCDocument: [
    { propertyName: 'requestedDoc', type: 'string' },
    { propertyName: 'kycInstructions', type: 'string' },
  ],
  ApproveSignup: [{ propertyName: 'signupApproved', type: 'boolean' }],
  CreateOperator: [
    { propertyName: 'businessUnitId', type: 'string' },
    { propertyName: 'username', type: 'string' },
    { propertyName: 'nameFirst', type: 'string' },
    { propertyName: 'nameMiddle', type: 'string' },
    { propertyName: 'nameLast', type: 'string' },
    { propertyName: 'email', type: 'string' },
    { propertyName: 'updatedBy', type: 'string' },
  ],
};
