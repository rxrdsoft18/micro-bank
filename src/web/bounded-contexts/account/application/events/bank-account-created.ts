import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BankAccountCreatedEvent } from '../../domain/event/bank-account-created';

@EventsHandler(BankAccountCreatedEvent)
export class BankAccountCreatedHandler
  implements IEventHandler<BankAccountCreatedEvent>
{
  handle(event: BankAccountCreatedEvent) {
    console.log('id', event.id.props.value);
    console.log(event, 'BankAccountCreatedHandler');
  }
}
