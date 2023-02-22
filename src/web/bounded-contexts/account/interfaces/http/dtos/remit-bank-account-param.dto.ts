import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RemitBankAccountParamDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
