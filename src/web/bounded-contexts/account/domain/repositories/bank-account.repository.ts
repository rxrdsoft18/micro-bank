import { BankAccount } from '../aggregates/bank-account';
import { BankAccountCreateResult } from '../../infrastructure/bank-account.infrastructure';

export interface BankAccountRepository {
  save(bankAccount: BankAccount): Promise<BankAccountCreateResult>;
}
