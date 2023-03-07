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
import { RemitBankAccountParamDTO } from './dtos/remit-bank-account-param.dto';
import { RemitBankAccountDTO } from './dtos/remit-bank-account.dto';
import { RemitCommand } from '../../application/commands/remit.command';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestErrorResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
} from '../../../../../core/responses-error';
import { BankAccountResponse } from '../../application/dtos/bank-account-response.dto';

@ApiTags('Bank account')
@Controller()
export class BankAccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiResponse({
    status: 201,
    description: 'Create new bank account',
    type: BankAccountResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @Post('bank-account')
  async createBankAccount(@Body() body: CreateBankAccountDTO) {
    const { name, email, password } = body;
    const command = new CreateBankAccountCommand(name, email, password);
    return await this.commandBus.execute(command);
  }

  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No register found',
    type: NotFoundResponse,
  })
  @Post('bank-account/:id/withdraw')
  async withdraw(
    @Param() params: WithdrawBankAccountParamDTO,
    @Body() body: WithdrawBankAccountDTO,
  ) {
    const command = new WithdrawCommand(params.id, body.amount);
    return await this.commandBus.execute(command);
  }

  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No register found',
    type: NotFoundResponse,
  })
  @Post('bank-account/:id/deposit')
  async deposit(
    @Param() params: DepositBankAccountParamDTO,
    @Body() body: DepositBankAccountDTO,
  ) {
    const command = new DepositCommand(params.id, body.amount, body.currency);
    return await this.commandBus.execute(command);
  }

  @ApiBadRequestResponse({
    type: BadRequestErrorResponse,
    description: 'Error inputs',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error server',
    type: InternalServerErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'No register found',
    type: NotFoundResponse,
  })
  @Post('bank-account/:id/remit')
  async remit(
    @Param() params: RemitBankAccountParamDTO,
    @Body() body: RemitBankAccountDTO,
  ) {
    const command = new RemitCommand(
      params.id,
      body.receiverId,
      body.amount,
      body.currency,
    );
    return await this.commandBus.execute(command);
  }
}
