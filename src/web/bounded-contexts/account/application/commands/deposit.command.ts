import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BankAccountInfrastructure } from '../../infrastructure/bank-account.infrastructure';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccountResponseDTO } from '../dtos/bank-account-response.dto';

export class DepositCommand implements ICommand {
  constructor(
    readonly accountId: string,
    readonly amount: number,
    readonly currency: string,
  ) {}
}

@CommandHandler(DepositCommand)
export class DepositCommandHandler implements ICommandHandler<DepositCommand> {
  constructor(
    @Inject(BankAccountInfrastructure)
    private repository: BankAccountRepository,
  ) {}

  async execute(command: DepositCommand) {
    const bankAccountResult = await this.repository.findById(command.accountId);

    if (bankAccountResult.isErr()) {
      throw new NotFoundException(
        bankAccountResult.error.message,
        bankAccountResult.error.name,
      );
    }

    const bankAccount = bankAccountResult.value;

    const depositResult = bankAccount.deposit(command.amount, command.currency);

    console.log(depositResult, 'depositResult');

    if (depositResult.isErr()) {
      throw new BadRequestException(
        depositResult.error.message,
        depositResult.error.name,
      );
    }

    const saveResult = await this.repository.save(bankAccount);

    if (saveResult.isErr()) {
      throw new InternalServerErrorException(
        saveResult.error.message,
        saveResult.error.name,
      );
    }

    bankAccount.commit();

    return BankAccountResponseDTO.fromDomainToResponse(saveResult.value);
  }
}
