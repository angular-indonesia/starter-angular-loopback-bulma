/* tslint:disable */
import {
  Chatdetail
} from '../index';

declare var Object: any;
export interface RoomchatInterface {
  "roomname"?: string;
  "createdat"?: Date;
  "id"?: number;
  chatDetail?: Chatdetail[];
}

export class Roomchat implements RoomchatInterface {
  "roomname": string;
  "createdat": Date;
  "id": number;
  chatDetail: Chatdetail[];
  constructor(data?: RoomchatInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Roomchat`.
   */
  public static getModelName() {
    return "Roomchat";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Roomchat for dynamic purposes.
  **/
  public static factory(data: RoomchatInterface): Roomchat{
    return new Roomchat(data);
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
      name: 'Roomchat',
      plural: 'Roomchats',
      path: 'Roomchats',
      properties: {
        "roomname": {
          name: 'roomname',
          type: 'string'
        },
        "createdat": {
          name: 'createdat',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        chatDetail: {
          name: 'chatDetail',
          type: 'Chatdetail[]',
          model: 'Chatdetail'
        },
      }
    }
  }
}
