/* tslint:disable */

declare var Object: any;
export interface ProfileDataInterface {
  "fullName": string;
  "address": string;
  "email": string;
  "placeOfBirth": string;
  "birthDate": Date;
  "noPhone": string;
  "photoProfile": string;
  "id"?: number;
}

export class ProfileData implements ProfileDataInterface {
  "fullName": string;
  "address": string;
  "email": string;
  "placeOfBirth": string;
  "birthDate": Date;
  "noPhone": string;
  "photoProfile": string;
  "id": number;
  constructor(data?: ProfileDataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProfileData`.
   */
  public static getModelName() {
    return "ProfileData";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProfileData for dynamic purposes.
  **/
  public static factory(data: ProfileDataInterface): ProfileData{
    return new ProfileData(data);
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
      name: 'ProfileData',
      plural: 'ProfileData',
      path: 'ProfileData',
      properties: {
        "fullName": {
          name: 'fullName',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "placeOfBirth": {
          name: 'placeOfBirth',
          type: 'string'
        },
        "birthDate": {
          name: 'birthDate',
          type: 'Date'
        },
        "noPhone": {
          name: 'noPhone',
          type: 'string'
        },
        "photoProfile": {
          name: 'photoProfile',
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
