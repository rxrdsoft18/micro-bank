import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BankAccountEntity } from '../src/web/bounded-contexts/account/infrastructure/entities/bank-account.entity';
import { DataSource, EntityManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';

let manager: EntityManager;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}

  private readonly dataSource = new DataSource({
    type: 'mysql',
    entities: [BankAccountEntity],
    host: this.configService.get('DATABASE_HOST'),
    port: this.configService.get('DATABASE_PORT'),
    database: this.configService.get('DATABASE_NAME'),
    username: this.configService.get('DATABASE_USER'),
    password: this.configService.get('DATABASE_PASSWORD'),
    synchronize: this.configService.get('DATABASE_SYNC'),
    logging: this.configService.get('DATABASE_LOGGING'),
  });

  async onModuleInit() {
    await this.dataSource.initialize().catch((error) => {
      console.log(error);
      process.exit(1);
    });

    manager = this.dataSource.manager;
  }

  static get manager() {
    return manager;
  }

  onModuleDestroy() {
    // do something
  }
}
