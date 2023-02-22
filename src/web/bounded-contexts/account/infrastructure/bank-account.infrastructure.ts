import { BankAccountRepository } from '../domain/repositories/bank-account.repository';
import { BankAccount } from '../domain/aggregates/bank-account';
import { BankAccountDTO } from './dtos/bank-account.dto';
import { DatabaseService } from '../../../../../libs/database.service';
import { BankAccountEntity } from './entities/bank-account.entity';
import { BankAccountCreateDatabaseException } from './exceptions/bank-account-create.exception';
import { err, ok, Result } from 'neverthrow';
import {
  BankAccountFindByIdDatabaseException,
  BankAccountNotFoundDatabaseException,
} from './exceptions/bank-account-find-by-id.exception';

export type BankAccountCreateResult = Result<
  BankAccount,
  BankAccountCreateDatabaseException
>;

export type BankAccountFindByIdResult = Result<
  BankAccount,
  BankAccountFindByIdDatabaseException | BankAccountNotFoundDatabaseException
>;

export class BankAccountInfrastructure implements BankAccountRepository {
  async save(bankAccount: BankAccount): Promise<BankAccountCreateResult> {
    try {
      const bankAccountEntity = BankAccountDTO.fromDomainToData(bankAccount);
      const bankAccountSaved = await DatabaseService.manager
        .getRepository(BankAccountEntity)
        .save(bankAccountEntity);
      return ok(BankAccountDTO.fromDataToDomain(bankAccountSaved));
    } catch (e) {
      return err(new BankAccountCreateDatabaseException(e.sqlMessage));
    }
  }

  async saveAll(
    bankAccounts: BankAccount[],
  ): Promise<BankAccountCreateResult[]> {
    try {
      const bankAccountEntities = bankAccounts.map((bankAccount) =>
        BankAccountDTO.fromDomainToData(bankAccount),
      );
      const bankAccountsSaved = await DatabaseService.manager
        .getRepository(BankAccountEntity)
        .save(bankAccountEntities);
      return bankAccountsSaved.map((bankAccountSaved) =>
        ok(BankAccountDTO.fromDataToDomain(bankAccountSaved)),
      );
    } catch (e) {
      return [err(new BankAccountCreateDatabaseException(e.sqlMessage))];
    }
  }

  async findById(bankAccountId: string): Promise<BankAccountFindByIdResult> {
    try {
      const bankAccountEntity = await DatabaseService.manager
        .getRepository(BankAccountEntity)
        .findOne({ where: { id: bankAccountId } });

      if (!bankAccountEntity) {
        return err(new BankAccountNotFoundDatabaseException());
      }

      return ok(BankAccountDTO.fromDataToDomain(bankAccountEntity));
    } catch (e) {
      return err(new BankAccountFindByIdDatabaseException(e.sqlMessage));
    }
  }
}
