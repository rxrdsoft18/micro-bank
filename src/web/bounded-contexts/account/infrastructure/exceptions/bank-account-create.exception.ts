import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class BankAccountCreateException extends InfrastructureException {
  constructor(message: string) {
    super(BankAccountCreateException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.SAVE_BANK_ACCOUNT_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `BankAccountCreateException: ${message}`;
  }
}
