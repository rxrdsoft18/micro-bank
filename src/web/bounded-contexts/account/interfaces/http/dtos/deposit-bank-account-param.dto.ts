import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DepositBankAccountParamDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
