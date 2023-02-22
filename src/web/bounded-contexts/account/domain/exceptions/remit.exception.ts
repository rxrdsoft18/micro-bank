import {
  DomainException,
  DomainExceptionCode,
} from '../../../../../core/domain/exceptions/domain.exception';

export class RemitWithdrawalAndDepositBankAccountCanNotSameException extends DomainException {
  constructor() {
    super(RemitWithdrawalAndDepositBankAccountCanNotSameException.getMessage());
    this.name =
      DomainExceptionCode.REMIT_WITHDRAWAL_AND_DEPOSIT_BANK_ACCOUNT_CAN_NOT_SAME;
  }

  static getMessage() {
    return 'Remit withdrawal and deposit bank account can not same';
  }
}
