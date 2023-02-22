import { BankAccount } from '../aggregates/bank-account';
import {
  BankAccountCreateResult,
  BankAccountFindByIdResult,
} from '../../infrastructure/bank-account.infrastructure';

export interface BankAccountRepository {
  save(bankAccount: BankAccount): Promise<BankAccountCreateResult>;

  saveAll(bankAccounts: BankAccount[]): Promise<BankAccountCreateResult[]>;
  findById(bankAccountId: string): Promise<BankAccountFindByIdResult>;
}
