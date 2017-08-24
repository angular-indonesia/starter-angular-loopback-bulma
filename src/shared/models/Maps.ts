/* tslint:disable */

declare var Object: any;
export interface MapsInterface {
  "id"?: string;
  "latitude"?: string;
  "longitude"?: string;
  "userID"?: string;
  "locationName"?: string;
}

export class Maps implements MapsInterface {
  "id": string;
  "latitude": string;
  "longitude": string;
  "userID": string;
  "locationName": string;
  constructor(data?: MapsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Maps`.
   */
  public static getModelName() {
    return "Maps";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Maps for dynamic purposes.
  **/
  public static factory(data: MapsInterface): Maps{
    return new Maps(data);
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
      name: 'Maps',
      plural: 'Maps',
      path: 'Maps',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "latitude": {
          name: 'latitude',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'string'
        },
        "userID": {
          name: 'userID',
          type: 'string'
        },
        "locationName": {
          name: 'locationName',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
