import { Module } from '@nestjs/common';
import { CreateBankAccountCommandHandler } from './application/commands/create-bank-account.command';
import { BankAccountController } from './interfaces/http/bank-account.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BankAccountFactory } from './domain/aggregates/bank-account.factory';
import { BankAccountCreatedHandler } from './application/events/bank-account-created';
import { BankAccountInfrastructure } from './infrastructure/bank-account.infrastructure';

const controllers = [BankAccountController];

const domain = [BankAccountFactory];
const application = [
  CreateBankAccountCommandHandler,
  BankAccountCreatedHandler,
];
const infrastructure = [BankAccountInfrastructure];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [...domain, ...application, ...infrastructure],
})
export class BankAccountModule {}
