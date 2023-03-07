import { Module } from '@nestjs/common';
import { CreateBankAccountCommandHandler } from './application/commands/create-bank-account.command';
import { BankAccountController } from './interfaces/http/bank-account.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BankAccountFactory } from './domain/aggregates/bank-account.factory';
import { BankAccountCreatedHandler } from './application/events/bank-account-created';
import { BankAccountInfrastructure } from './infrastructure/bank-account.infrastructure';
import { WithdrawCommandHandler } from './application/commands/withdraw.command';
import { DepositCommandHandler } from './application/commands/deposit.command';
import { BankAccountService } from './domain/services/bank-account.service';
import { RemitCommandHandler } from './application/commands/remit.command';
import { SNSEventPublisher } from './infrastructure/publisher/sns-event.publisher';
import { SQSEventPublisher } from './infrastructure/publisher/sqs-event.publisher';
import { DepositedHandler } from './application/events/deposited';
import { SQSEventConsumer } from './infrastructure/publisher/sqs-event.consumer';

const controllers = [BankAccountController];

const domain = [BankAccountFactory, BankAccountService];
const application = [
  CreateBankAccountCommandHandler,
  WithdrawCommandHandler,
  DepositCommandHandler,
  RemitCommandHandler,
  BankAccountCreatedHandler,
  DepositedHandler,
];
const infrastructure = [
  BankAccountInfrastructure,
  SNSEventPublisher,
  SQSEventPublisher,
  SQSEventConsumer,
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [...domain, ...application, ...infrastructure],
})
export class BankAccountModule {}
