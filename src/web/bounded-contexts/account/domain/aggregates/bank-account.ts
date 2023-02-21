import { AggregateRoot } from '@nestjs/cqrs';
import { BankAccountCreatedEvent } from '../event/bank-account-created';
import { UuidVo } from '../value-objects/uuid.vo';

export type BankAccountEssentialProperties = Readonly<
  Required<{
    id: UuidVo;
    name: string;
    email: string;
  }>
>;

export type BankAccountOptionalProperties = Readonly<
  Partial<{
    password: string;
    balance: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type BankAccountProperties = BankAccountEssentialProperties &
  BankAccountOptionalProperties;
export class BankAccount extends AggregateRoot {
  private readonly id: UuidVo;
  private readonly name: string;
  private readonly email: string;
  private password: string;
  private balance: number;

  private currency: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: BankAccountProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    this.apply(
      Object.assign(new BankAccountCreatedEvent(), {
        id: this.id,
        name: this.name,
        email: this.email,
      }),
    );
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      balance: this.balance,
      currency: this.currency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
