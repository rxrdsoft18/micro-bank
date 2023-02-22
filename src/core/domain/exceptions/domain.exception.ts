export enum DomainExceptionCode {
  DEFAULT = 'DEFAULT',
  UUID_ID_INVALID = 'UUID_ID_INVALID',

  WITHDRAW_CAN_NOT_UNDER_ONE = 'WITHDRAW_CAN_NOT_UNDER_ONE',
  WITHDRAW_CAN_NOT_OVER_BALANCE = 'WITHDRAW_CAN_NOT_OVER_BALANCE',

  DEPOSIT_CAN_NOT_UNDER_ONE = 'DEPOSIT_CAN_NOT_UNDER_ONE',

  REMIT_WITHDRAWAL_AND_DEPOSIT_BANK_ACCOUNT_CAN_NOT_SAME = 'REMIT_WITHDRAWAL_AND_DEPOSIT_BANK_ACCOUNT_CAN_NOT_SAME',
}

export abstract class DomainException extends Error {
  protected constructor(message?: string) {
    super(message);
    this.name = DomainExceptionCode.DEFAULT;
  }
}
