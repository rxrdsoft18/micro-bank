import { BankAccount } from "../../domain/aggregates/bank-account";

export interface BankAccountResponse {
  id: string;
  name: string;
  balance: number;
  currency: string;

  createdAt: Date;
}

export class BankAccountResponseDTO {
  static fromDomainToResponse(bankAccount: BankAccount): BankAccountResponse {
    return {
      id: bankAccount.properties().id.value,
      name: bankAccount.properties().name,
      balance: bankAccount.properties().balance,
      currency: bankAccount.properties().currency,
      createdAt: bankAccount.properties().createdAt,
    };
  }
}
