import { ValueObject } from '../base-classes/value-object.base';
import { Guard } from '../guard';
import { ArgumentNotProvidedException } from '../exceptions';

/** Note: Every property in address Value Object can be
 * it's own Value Object if needed.
 * Value Objects with multiple properties can contain
 * other Value Objects inside.
 * */

export interface AddressProps {
  country: string;
  postalCode: string;
  street: string;
}

export class Address extends ValueObject<AddressProps> {
  get country(): string {
    return this.props.country;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get street(): string {
    return this.props.street;
  }

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules
   */
  protected validate(props: AddressProps): boolean {
    if (!Guard.lengthIsBetween(props.country, 2, 50)) {
      throw new ArgumentNotProvidedException('country is out of range');
    }
    if (!Guard.lengthIsBetween(props.street, 2, 50)) {
      throw new ArgumentNotProvidedException('street is out of range');
    }
    if (!Guard.lengthIsBetween(props.postalCode, 2, 10)) {
      throw new ArgumentNotProvidedException('postalCode is out of range');
    }
    return true
  }
}