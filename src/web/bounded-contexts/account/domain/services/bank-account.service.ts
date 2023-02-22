import { BankAccount } from '../aggregates/bank-account';

export class RemittanceOptions {
  readonly account: BankAccount;
  readonly receiver: BankAccount;
  readonly amount: number;
  readonly currency: string;
}
export class BankAccountService {
  remit({ account, receiver, amount, currency }: RemittanceOptions): void {
    account.withdraw(amount);
    receiver.deposit(amount, currency);
  }
}
