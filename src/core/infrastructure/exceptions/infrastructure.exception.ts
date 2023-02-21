export enum InfrastructureExceptionCode {
  DEFAULT = 'INFRASTRUCTURE_EXCEPTION',
  SAVE_BANK_ACCOUNT_DATABASE_EXCEPTION = 'SAVE_BANK_ACCOUNT_DATABASE_EXCEPTION',
}

export class InfrastructureException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = InfrastructureExceptionCode.DEFAULT;
  }
}
