import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class BankAccountCreateDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(BankAccountCreateDatabaseException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.SAVE_BANK_ACCOUNT_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `BankAccountCreateException: ${message}`;
  }
}
