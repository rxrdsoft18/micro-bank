import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class WithdrawBankAccountParamDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
