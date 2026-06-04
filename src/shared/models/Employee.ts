/* tslint:disable */
import {
  Employeeposition
} from '../index';

declare var Object: any;
export interface EmployeeInterface {
  "parentid"?: number;
  "id"?: number;
  "name": string;
  "employeepositionId": number;
  employeeposition?: Employeeposition;
}

export class Employee implements EmployeeInterface {
  "parentid": number;
  "id": number;
  "name": string;
  "employeepositionId": number;
  employeeposition: Employeeposition;
  constructor(data?: EmployeeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Employee`.
   */
  public static getModelName() {
    return "Employee";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Employee for dynamic purposes.
  **/
  public static factory(data: EmployeeInterface): Employee{
    return new Employee(data);
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
      name: 'Employee',
      plural: 'Employees',
      path: 'Employees',
      properties: {
        "parentid": {
          name: 'parentid',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "employeepositionId": {
          name: 'employeepositionId',
          type: 'number'
        },
      },
      relations: {
        employeeposition: {
          name: 'employeeposition',
          type: 'Employeeposition',
          model: 'Employeeposition'
        },
      }
    }
  }
}
