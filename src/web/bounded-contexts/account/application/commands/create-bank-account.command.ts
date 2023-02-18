import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BankAccountFactory } from '../../domain/aggregates/bank-account.factory';
import { UuidVo } from "../../domain/value-objects/uuid.vo";
import { v4 as uuid } from 'uuid';
export class CreateBankAccountCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}
}

@CommandHandler(CreateBankAccountCommand)
export class CreateBankAccountCommandHandler
  implements ICommandHandler<CreateBankAccountCommand>
{
  constructor(private readonly bankAccountFactory: BankAccountFactory) {}

  async execute(command: CreateBankAccountCommand) {
    const { name, email, password } = command;
    const bankAccount = this.bankAccountFactory.create({
      id: UuidVo.create(uuid()),
      name,
      email,
      password,
    });

    bankAccount.create();
    bankAccount.commit();
  }
}
