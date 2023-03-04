import { UuidVo } from '../value-objects/uuid.vo';
import { IEvent } from '@nestjs/cqrs';

export class DepositedEvent implements IEvent {
  readonly id: UuidVo;
  readonly amount: number;
  readonly currency: string;
}
