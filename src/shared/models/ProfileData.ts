/* tslint:disable */

declare var Object: any;
export interface ProfiledataInterface {
  "id"?: number;
  "photoprofile"?: string;
  "folder"?: string;
  "placeofbirth"?: string;
  "nophone"?: string;
  "fullname"?: string;
  "email"?: string;
  "birthdate"?: Date;
  "address"?: string;
}

export class Profiledata implements ProfiledataInterface {
  "id": number;
  "photoprofile": string;
  "folder": string;
  "placeofbirth": string;
  "nophone": string;
  "fullname": string;
  "email": string;
  "birthdate": Date;
  "address": string;
  constructor(data?: ProfiledataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Profiledata`.
   */
  public static getModelName() {
    return "Profiledata";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Profiledata for dynamic purposes.
  **/
  public static factory(data: ProfiledataInterface): Profiledata{
    return new Profiledata(data);
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
      name: 'Profiledata',
      plural: 'Profiledata',
      path: 'Profiledata',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "photoprofile": {
          name: 'photoprofile',
          type: 'string'
        },
        "folder": {
          name: 'folder',
          type: 'string'
        },
        "placeofbirth": {
          name: 'placeofbirth',
          type: 'string'
        },
        "nophone": {
          name: 'nophone',
          type: 'string'
        },
        "fullname": {
          name: 'fullname',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "birthdate": {
          name: 'birthdate',
          type: 'Date'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
