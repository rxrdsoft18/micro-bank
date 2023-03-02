import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BankAccountCreatedEvent } from '../../domain/event/bank-account-created';
import { SNSEventPublisher } from '../../infrastructure/publisher/sns-event.publisher';
import {
  BankAccountRegistered,
  IntegrationEventPublisher,
  Topic,
} from './integration-events';
import { Inject } from '@nestjs/common';

@EventsHandler(BankAccountCreatedEvent)
export class BankAccountCreatedHandler
  implements IEventHandler<BankAccountCreatedEvent>
{
  constructor(
    @Inject(SNSEventPublisher)
    private readonly publisherSNS: IntegrationEventPublisher,
  ) {}

  async handle(event: BankAccountCreatedEvent) {
    await this.publisherSNS.publish(
      Topic.BACK_ACCOUNT_REGISTERED,
      new BankAccountRegistered(event.id.props.value, event.name, event.email),
    );
  }
}
