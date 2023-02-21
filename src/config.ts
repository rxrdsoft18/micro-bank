import { Logger } from '@nestjs/common';
import { IsBoolean, IsInt, IsString, validateSync } from 'class-validator';

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  @IsString()
  readonly DATABASE_HOST = process.env.DATABASE_HOST as string;

  @IsInt()
  readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);

  @IsString()
  readonly DATABASE_NAME = process.env.DATABASE_NAME as string;

  @IsString()
  readonly DATABASE_USER = process.env.DATABASE_USER as string;

  @IsString()
  readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

  @IsInt()
  readonly PORT = Number(process.env.PORT);

  @IsBoolean()
  readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';

  @IsBoolean()
  readonly DATABASE_SYNC = process.env.DATABASE_SYNC === 'true';

  constructor() {
    this.logger.log(`Config : ${JSON.stringify(this, null, 2)}`);
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation errors: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
export const Config = new Configuration();
