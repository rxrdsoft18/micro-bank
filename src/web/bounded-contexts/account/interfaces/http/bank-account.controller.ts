import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountDto } from './dtos/create-bank-account.dto';
import { CreateBankAccountCommand } from '../../application/commands/create-bank-account.command';

@Controller()
export class BankAccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('bank-account')
  async openAccount(@Body() body: CreateBankAccountDto) {
    const { name, email, password } = body;
    console.log('BankAccountController.openAccount');
    const command = new CreateBankAccountCommand(name, email, password);
    await this.commandBus.execute(command);
  }
}
