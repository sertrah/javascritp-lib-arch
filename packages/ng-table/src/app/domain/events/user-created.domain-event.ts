
export type DomainEventProps<T> = Omit<T, 'correlationId' | 'dateOccurred'> &
  Omit<DomainEvent, 'correlationId' | 'dateOccurred'> & {
    correlationId?: string;
    dateOccurred?: number;
};

export abstract class DomainEvent {
  /** Aggregate ID where domain event occurred */
  public readonly aggregateId: string;

  /** Date when this domain event occurred */
  public readonly dateOccurred: number;

  /** ID for correlation purposes (for UnitOfWork, Integration Events,logs correlation etc).
   * This ID is set automatically in a publisher.
   */
  public correlationId: string | undefined;

  constructor(props: DomainEventProps<unknown>) {
/*  if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    } */
    this.aggregateId = props.aggregateId;
    this.dateOccurred = props.dateOccurred || Date.now();
    if (props.correlationId) this.correlationId = props.correlationId;
  }
}

// DomainEvent is a plain object with properties
export class UserCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }

  readonly email: string;

  readonly country: string;

  readonly postalCode: string;

  readonly street: string;
}