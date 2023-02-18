import { IEvent } from '@nestjs/cqrs';
import { UuidVo } from '../value-objects/uuid.vo';

export class BankAccountCreatedEvent implements IEvent {
  readonly id: UuidVo;
  readonly name: string;
  readonly email: string;
}
