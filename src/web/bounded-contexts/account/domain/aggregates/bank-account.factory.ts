import { BankAccount, BankAccountProperties } from "./bank-account";
import { EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UuidVo } from '../value-objects/uuid.vo';

export type CreateBankAccountOptions = Readonly<{
  id: UuidVo;
  name: string;
  email: string;
  password: string;
}>;

export class BankAccountFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}
  create(options: CreateBankAccountOptions): BankAccount {
    return this.eventPublisher.mergeObjectContext(
      new BankAccount({
        ...options,
        balance: 0,
        currency: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties: BankAccountProperties): BankAccount {
    return this.eventPublisher.mergeObjectContext(new BankAccount(properties));
  }
}
