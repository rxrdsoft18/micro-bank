import { IEvent } from '@nestjs/cqrs';

export enum Topic {
  BACK_ACCOUNT_REGISTERED = 'BankAccountRegistered',
  BANK_ACCOUNT_DEPOSITED = 'BankAccountDeposited',
  BANK_ACCOUNT_WITHDRAWN = 'BankAccountWithdrawn',

  BANK_ACCOUNT_REMITTANCE = 'BankAccountRemittance',
}

export class BankAccountRegistered {
  constructor(
    readonly bankAccountId: string,
    readonly name: string,
    readonly email: string,
  ) {}
}

export interface IntegrationEventPublisher {
  publish(name: Topic, body: IEvent): Promise<void>;
}
