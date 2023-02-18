import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BankAccountModule } from './web/bounded-contexts/account/bank-account-module';

@Module({
  imports: [ConfigModule.forRoot(), BankAccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
