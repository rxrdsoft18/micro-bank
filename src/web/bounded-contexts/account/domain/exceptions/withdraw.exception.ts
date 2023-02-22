import {
  DomainException,
  DomainExceptionCode,
} from '../../../../../core/domain/exceptions/domain.exception';

export class WithdrawCanNotUderOneException extends DomainException {
  constructor() {
    super(WithdrawCanNotUderOneException.getMessage());
    this.name = DomainExceptionCode.WITHDRAW_CAN_NOT_UNDER_ONE;
  }

  static getMessage() {
    return 'Withdraw can not under 1';
  }
}

export class WitdrawCanNotOverBalanceException extends DomainException {
  constructor() {
    super(WitdrawCanNotOverBalanceException.getMessage());
    this.name = DomainExceptionCode.WITHDRAW_CAN_NOT_OVER_BALANCE;
  }

  static getMessage() {
    return 'Withdraw can not over balance';
  }
}
