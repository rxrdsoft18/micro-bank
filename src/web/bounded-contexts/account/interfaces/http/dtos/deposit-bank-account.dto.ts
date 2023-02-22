import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DepositBankAccountDTO {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly amount: number;

  @IsNotEmpty()
  @IsEnum(['USD', 'PEN'])
  readonly currency: string;
}
