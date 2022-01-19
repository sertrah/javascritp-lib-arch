import { Entity } from './entity.base';


export abstract class DomainEvent {
}
class DomainEvents {
  public static prepareForPublish(aggregate: AggregateRoot<unknown>): void {
  }
}

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.prepareForPublish(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}