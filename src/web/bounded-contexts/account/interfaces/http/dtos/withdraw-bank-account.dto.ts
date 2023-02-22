import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class WithdrawBankAccountDTO {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly amount: number;
}
