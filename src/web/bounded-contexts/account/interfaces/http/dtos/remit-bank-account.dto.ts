import { IsEnum, IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RemitBankAccountDTO {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly amount: number;

  @IsNotEmpty()
  @IsEnum(['USD', 'PEN'])
  readonly currency: string;

  @IsNotEmpty()
  @IsUUID()
  readonly receiverId: string;
}
