export enum DomainExceptionCode {
  DEFAULT = 'DEFAULT',
  UUID_ID_INVALID = 'UUID_ID_INVALID',
}

export abstract class DomainException extends Error {
  protected constructor(message?: string) {
    super(message);
    this.name = DomainExceptionCode.DEFAULT;
  }
}
