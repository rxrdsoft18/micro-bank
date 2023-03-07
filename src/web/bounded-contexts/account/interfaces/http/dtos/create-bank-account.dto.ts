import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateBankAccountDTO {
  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: 'Bank account name',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'email@email.com',
    description: 'Bank account email',
    required: true,
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: 'string',
    example: 'password',
    description: 'Bank account password',
  })
  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
