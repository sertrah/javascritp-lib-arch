import { DomainPrimitive } from '../base-classes/value-object.base';
import { ArgumentInvalidException } from '../exceptions/argument-invalid.exception';
import { ID } from './id.value-object';

export class UUID extends ID {
  /**
   *Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): UUID {
    return new UUID("prueba-uuid");
  }

  protected validate(value: DomainPrimitive<string>): boolean {
    if (!this.validate(value)) {
      throw new ArgumentInvalidException('Incorrect UUID format');
    }
    return true
  }
}