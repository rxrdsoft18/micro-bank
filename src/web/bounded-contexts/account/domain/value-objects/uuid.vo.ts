import { validate as uuidValidate } from 'uuid';
import { ValueObject } from './value-object';
import { UuidIdInvalidException } from '../exceptions/uuid-id.exception';

interface UuidProps {
  value: string;
}

export class UuidVo extends ValueObject<UuidProps> {
  private constructor(props: UuidProps) {
    super(props);
  }

  static create(uuid: string): UuidVo {
    if (!uuidValidate(uuid)) {
      new UuidIdInvalidException();
    }

    return new UuidVo({ value: uuid });
  }

  get value() {
    return this.props.value;
  }
}
