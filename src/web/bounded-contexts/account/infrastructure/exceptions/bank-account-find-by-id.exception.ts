import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from '../../../../../core/infrastructure/exceptions/infrastructure.exception';

export class BankAccountFindByIdDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(BankAccountFindByIdDatabaseException.getMessage(message));
    this.name =
      InfrastructureExceptionCode.FIND_BANK_ACCOUNT_BY_ID_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `BankAccountFindByIdException: ${message}`;
  }
}

export class BankAccountNotFoundDatabaseException extends InfrastructureException {
  constructor() {
    super(BankAccountNotFoundDatabaseException.getMessage());
    this.name = InfrastructureExceptionCode.NOT_FOUND_BANK_ACCOUNT_EXCEPTION;
  }

  static getMessage() {
    return `BankAccountNotFoundException: Not found bank account`;
  }
}
