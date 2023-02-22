import { AggregateRoot } from '@nestjs/cqrs';
import { BankAccountCreatedEvent } from '../event/bank-account-created';
import { UuidVo } from '../value-objects/uuid.vo';
import {
  WitdrawCanNotOverBalanceException,
  WithdrawCanNotUderOneException,
} from '../exceptions/withdraw.exception';
import { Err, err, ok, Result } from "neverthrow";
import { DepositCanNotUndeOneException } from '../exceptions/deposit.exception';

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

  withdraw(
    amount: number,
  ): Result<
    any,
    WitdrawCanNotOverBalanceException | WithdrawCanNotUderOneException
  > {
    if (amount < 1) {
      return err(new WithdrawCanNotUderOneException());
    }

    if (this.balance < amount) {
      return err(new WitdrawCanNotOverBalanceException());
    }
    this.balance -= amount;
    this.updatedAt = new Date();
    return ok(undefined);
  }

  deposit(
    amount: number,
    currency: string,
  ): Result<any, DepositCanNotUndeOneException> {
    if (amount < 1) {
      return err(new DepositCanNotUndeOneException());
    }

    this.balance += amount;
    this.currency = currency;
    this.updatedAt = new Date();
    return ok(undefined);
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
