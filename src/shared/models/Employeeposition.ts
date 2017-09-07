/* tslint:disable */

declare var Object: any;
export interface EmployeepositionInterface {
  "name": string;
  "id"?: number;
}

export class Employeeposition implements EmployeepositionInterface {
  "name": string;
  "id": number;
  constructor(data?: EmployeepositionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Employeeposition`.
   */
  public static getModelName() {
    return "Employeeposition";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Employeeposition for dynamic purposes.
  **/
  public static factory(data: EmployeepositionInterface): Employeeposition{
    return new Employeeposition(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Employeeposition',
      plural: 'Employeepositions',
      path: 'Employeepositions',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
