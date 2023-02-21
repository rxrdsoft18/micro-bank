import { BankAccount } from '../../domain/aggregates/bank-account';
import { BankAccountEntity } from '../entities/bank-account.entity';
import { UuidVo } from "../../domain/value-objects/uuid.vo";

export class BankAccountDTO {
  static fromDomainToData(bankAccount: BankAccount): BankAccountEntity {
    return {
      id: bankAccount.properties().id.value,
      name: bankAccount.properties().name,
      email: bankAccount.properties().email,
      password: bankAccount.properties().password,
      balance: bankAccount.properties().balance,
      currency: bankAccount.properties().currency,
      createdAt: bankAccount.properties().createdAt,
      updatedAt: bankAccount.properties().updatedAt,
      deletedAt: bankAccount.properties().deletedAt,
    };
  }

  static fromDataToDomain(bankAccountEntity: BankAccountEntity): BankAccount {
    const id = UuidVo.create(bankAccountEntity.id);
    return new BankAccount({
      id: id,
      name: bankAccountEntity.name,
      email: bankAccountEntity.email,
      password: bankAccountEntity.password,
      balance: bankAccountEntity.balance,
      currency: bankAccountEntity.currency,
      createdAt: bankAccountEntity.createdAt,
      updatedAt: bankAccountEntity.updatedAt,
      deletedAt: bankAccountEntity.deletedAt,
    });
  }
}
