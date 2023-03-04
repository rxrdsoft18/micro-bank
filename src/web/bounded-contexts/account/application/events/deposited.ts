import { DepositedEvent } from '../../domain/event/deposited';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SQSEventPublisher } from '../../infrastructure/publisher/sqs-event.publisher';
import { IntegrationProducerEvent } from './integration-events';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@EventsHandler(DepositedEvent)
export class DepositedHandler implements IEventHandler<DepositedEvent> {
  constructor(
    @Inject(SQSEventPublisher)
    private readonly publisherSqs: IntegrationProducerEvent,
    private readonly config: ConfigService,
  ) {}

  async handle(event: DepositedEvent): Promise<void> {
    const url = this.config.get('AWS_DEPOSITED_ENDPOINT');
    await this.publisherSqs.publish(url, {
      subject: 'Deposited',
      id: event.id.value,
      amount: event.amount.toString(),
      currency: event.currency,
    });
  }
}
