import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BankAccountFactory } from '../../domain/aggregates/bank-account.factory';
import { UuidVo } from '../../domain/value-objects/uuid.vo';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { BankAccountInfrastructure } from '../../infrastructure/bank-account.infrastructure';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccountResponseDTO } from '../dtos/bank-account-response.dto';
export class CreateBankAccountCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

@CommandHandler(CreateBankAccountCommand)
export class CreateBankAccountCommandHandler
  implements ICommandHandler<CreateBankAccountCommand>
{
  constructor(
    @Inject(BankAccountInfrastructure)
    private repository: BankAccountRepository,
    private readonly bankAccountFactory: BankAccountFactory,
  ) {}

  async execute(command: CreateBankAccountCommand) {
    const { name, email, password } = command;

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const bankAccount = this.bankAccountFactory.create({
      id: UuidVo.create(uuid()),
      name,
      email,
      password: passwordHashed,
    });
    bankAccount.create();

    const bankAccountSavedResult = await this.repository.save(bankAccount);

    if (bankAccountSavedResult.isErr()) {
      throw new InternalServerErrorException(
        bankAccountSavedResult.error.message,
        bankAccountSavedResult.error.name,
      );
    }
    const bankAccountSaved = bankAccountSavedResult.value;

    bankAccount.commit();

    return BankAccountResponseDTO.fromDomainToResponse(bankAccountSaved);
  }
}
