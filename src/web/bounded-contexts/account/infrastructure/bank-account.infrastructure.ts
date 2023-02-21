import { BankAccountRepository } from '../domain/repositories/bank-account.repository';
import { BankAccount } from '../domain/aggregates/bank-account';
import { BankAccountDTO } from './dtos/bank-account.dto';
import { DatabaseService } from '../../../../../libs/database.service';
import { BankAccountEntity } from './entities/bank-account.entity';
import { BankAccountCreateException } from './exceptions/bank-account-create.exception';

export class BankAccountInfrastructure implements BankAccountRepository {
  async save(bankAccount: BankAccount): Promise<BankAccount> {
    try {
      const bankAccountEntity = BankAccountDTO.fromDomainToData(bankAccount);
      const bankAccountSaved = await DatabaseService.manager
        .getRepository(BankAccountEntity)
        .save(bankAccountEntity);
      return BankAccountDTO.fromDataToDomain(bankAccountSaved);
    } catch (e) {
      console.log('Error: ', e);
      throw new BankAccountCreateException(e);
    }
  }
}
