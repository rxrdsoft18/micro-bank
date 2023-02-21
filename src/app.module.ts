import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BankAccountModule } from './web/bounded-contexts/account/bank-account-module';
import { DatabaseService } from '../libs/database.service';
import { configSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchema,
    }),
    BankAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
