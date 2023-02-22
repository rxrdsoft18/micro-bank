export enum InfrastructureExceptionCode {
  DEFAULT = 'INFRASTRUCTURE_EXCEPTION',
  SAVE_BANK_ACCOUNT_DATABASE_EXCEPTION = 'SAVE_BANK_ACCOUNT_DATABASE_EXCEPTION',
  FIND_BANK_ACCOUNT_BY_ID_DATABASE_EXCEPTION = 'FIND_BANK_ACCOUNT_BY_ID_DATABASE_EXCEPTION',

  NOT_FOUND_BANK_ACCOUNT_EXCEPTION = 'NOT_FOUND_BANK_ACCOUNT_EXCEPTION',
}

export class InfrastructureException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = InfrastructureExceptionCode.DEFAULT;
  }
}
