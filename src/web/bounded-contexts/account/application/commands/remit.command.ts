import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { BankAccountInfrastructure } from '../../infrastructure/bank-account.infrastructure';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { RemitWithdrawalAndDepositBankAccountCanNotSameException } from '../../domain/exceptions/remit.exception';
import { BankAccountService } from '../../domain/services/bank-account.service';

export class RemitCommand implements ICommand {
  constructor(
    public readonly bankAccountId: string,
    public readonly receiverBankAccountId: string,
    public readonly amount: number,

    public readonly currency: string,
  ) {}
}

@CommandHandler(RemitCommand)
export class RemitCommandHandler implements ICommandHandler<RemitCommand> {
  constructor(
    @Inject(BankAccountInfrastructure)
    private repository: BankAccountRepository,
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(command: RemitCommand): Promise<void> {
    const { bankAccountId, receiverBankAccountId, amount, currency } = command;
    console.log('RemitCommandHandler');
    console.log(command);

    if (bankAccountId === receiverBankAccountId) {
      throw new UnprocessableEntityException(
        RemitWithdrawalAndDepositBankAccountCanNotSameException.getMessage(),
      );
    }

    const bankAccountResult = await this.repository.findById(bankAccountId);

    if (bankAccountResult.isErr()) {
      throw new NotFoundException(
        bankAccountResult.error.message,
        bankAccountResult.error.name,
      );
    }

    const receiverBankAccountResult = await this.repository.findById(
      receiverBankAccountId,
    );

    if (receiverBankAccountResult.isErr()) {
      throw new NotFoundException(
        receiverBankAccountResult.error.message,
        receiverBankAccountResult.error.name,
      );
    }

    this.bankAccountService.remit({
      account: bankAccountResult.value,
      receiver: receiverBankAccountResult.value,
      amount,
      currency,
    });

    await this.repository.saveAll([
      bankAccountResult.value,
      receiverBankAccountResult.value,
    ]);
  }
}
