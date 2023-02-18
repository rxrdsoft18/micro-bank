import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBankAccountDto {
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
