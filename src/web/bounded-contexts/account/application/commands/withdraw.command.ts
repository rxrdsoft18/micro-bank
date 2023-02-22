import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BankAccountInfrastructure } from '../../infrastructure/bank-account.infrastructure';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccountResponseDTO } from "../dtos/bank-account-response.dto";

export class WithdrawCommand implements ICommand {
  constructor(
    public readonly bankAccountId: string,
    public readonly amount: number,
  ) {}
}

@CommandHandler(WithdrawCommand)
export class WithdrawCommandHandler
  implements ICommandHandler<WithdrawCommand>
{
  constructor(
    @Inject(BankAccountInfrastructure)
    private repository: BankAccountRepository,
  ) {}

  async execute(command: WithdrawCommand) {
    const bankAccountResult = await this.repository.findById(
      command.bankAccountId,
    );

    if (bankAccountResult.isErr()) {
      throw new NotFoundException(
        bankAccountResult.error.message,
        bankAccountResult.error.name,
      );
    }
    const bankAccount = bankAccountResult.value;

    const withdrawResult = bankAccount.withdraw(command.amount);

    if (withdrawResult.isErr()) {
      throw new BadRequestException(
        withdrawResult.error.message,
        withdrawResult.error.name,
      );
    }

    const saveResult = await this.repository.save(bankAccount);

    if (saveResult.isErr()) {
      throw new InternalServerErrorException(
        saveResult.error.message,
        saveResult.error.name,
      );
    }
    return BankAccountResponseDTO.fromDomainToResponse(saveResult.value);
  }
}
