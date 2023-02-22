import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateBankAccountDTO } from './dtos/create-bank-account.dto';
import { CreateBankAccountCommand } from '../../application/commands/create-bank-account.command';
import { WithdrawBankAccountDTO } from './dtos/withdraw-bank-account.dto';
import { WithdrawBankAccountParamDTO } from './dtos/withdraw-bank-account-param.dto';
import { WithdrawCommand } from '../../application/commands/withdraw.command';
import { DepositBankAccountParamDTO } from './dtos/deposit-bank-account-param.dto';
import { DepositBankAccountDTO } from './dtos/deposit-bank-account.dto';
import { DepositCommand } from '../../application/commands/deposit.command';

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
    const command = new WithdrawCommand(params.id, body.amount);
    return await this.commandBus.execute(command);
  }

  @Post('bank-account/:id/deposit')
  async deposit(
    @Param() params: DepositBankAccountParamDTO,
    @Body() body: DepositBankAccountDTO,
  ) {
    console.log('BankAccountController.deposit');
    console.log(body, 'body');
    console.log(params, 'params');
    const command = new DepositCommand(params.id, body.amount, body.currency);
    return await this.commandBus.execute(command);
  }
}
