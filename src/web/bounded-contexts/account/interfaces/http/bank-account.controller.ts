import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateBankAccountDTO } from './dtos/create-bank-account.dto';
import { CreateBankAccountCommand } from '../../application/commands/create-bank-account.command';
import { WithdrawBankAccountDTO } from './dtos/withdraw-bank-account.dto';
import { WithdrawBankAccountParamDTO } from './dtos/withdraw-bank-account-param.dto';

@Controller()
export class BankAccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('bank-account')
  async openAccount(@Body() body: CreateBankAccountDTO) {
    const { name, email, password } = body;
    console.log('BankAccountController.openAccount');
    const command = new CreateBankAccountCommand(name, email, password);
    return await this.commandBus.execute(command);
  }

  @Post('bank-account/:id/withdraw')
  async withdraw(
    @Param() params: WithdrawBankAccountParamDTO,
    @Body() body: WithdrawBankAccountDTO,
  ) {
    // TODO
    console.log('BankAccountController.withdraw');
    console.log(body, 'body');
    console.log(params, 'params');
  }
}
