import {
  DomainException,
  DomainExceptionCode,
} from '../../../../../core/domain/exceptions/domain.exception';

export class DepositCanNotUndeOneException extends DomainException {
  constructor() {
    super(DepositCanNotUndeOneException.getMessage());
    this.name = DomainExceptionCode.DEPOSIT_CAN_NOT_UNDER_ONE;
  }

  static getMessage() {
    return 'Deposit can not under 1';
  }
}
