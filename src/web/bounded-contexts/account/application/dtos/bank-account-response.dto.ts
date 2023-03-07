import { BankAccount } from '../../domain/aggregates/bank-account';
import { ApiProperty } from '@nestjs/swagger';

export class BankAccountResponse {
  @ApiProperty({
    type: 'string',
    example: '9b0c6238-29ec-4b94-840d-3d71884e0d73',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1000,
  })
  balance: number;
  @ApiProperty({
    type: 'string',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    type: 'date',
    example: '2021-10-21',
  })
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
