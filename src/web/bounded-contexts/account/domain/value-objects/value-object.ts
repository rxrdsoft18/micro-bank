interface ValueObjectProps {
  [index: string]: any;
}
export abstract class ValueObject<Props extends ValueObjectProps> {
  readonly props: Props;

  protected constructor(props: Props) {
    this.props = Object.freeze(props);
  }
}
