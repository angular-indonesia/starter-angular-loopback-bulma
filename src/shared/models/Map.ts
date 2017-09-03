/* tslint:disable */

declare var Object: any;
export interface MapInterface {
  "userid"?: string;
  "locationname"?: string;
  "longitude"?: string;
  "latitude"?: string;
  "id"?: number;
}

export class Map implements MapInterface {
  "userid": string;
  "locationname": string;
  "longitude": string;
  "latitude": string;
  "id": number;
  constructor(data?: MapInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Map`.
   */
  public static getModelName() {
    return "Map";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Map for dynamic purposes.
  **/
  public static factory(data: MapInterface): Map{
    return new Map(data);
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
      name: 'Map',
      plural: 'Maps',
      path: 'Maps',
      properties: {
        "userid": {
          name: 'userid',
          type: 'string'
        },
        "locationname": {
          name: 'locationname',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'string'
        },
        "latitude": {
          name: 'latitude',
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
