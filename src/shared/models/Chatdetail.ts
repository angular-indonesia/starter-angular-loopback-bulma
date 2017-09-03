/* tslint:disable */

declare var Object: any;
export interface ChatdetailInterface {
  "sender"?: string;
  "message"?: string;
  "createdat"?: Date;
  "id"?: number;
  "RoomChatId"?: number;
}

export class Chatdetail implements ChatdetailInterface {
  "sender": string;
  "message": string;
  "createdat": Date;
  "id": number;
  "RoomChatId": number;
  constructor(data?: ChatdetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Chatdetail`.
   */
  public static getModelName() {
    return "Chatdetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Chatdetail for dynamic purposes.
  **/
  public static factory(data: ChatdetailInterface): Chatdetail{
    return new Chatdetail(data);
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
      name: 'Chatdetail',
      plural: 'Chatdetails',
      path: 'Chatdetails',
      properties: {
        "sender": {
          name: 'sender',
          type: 'string'
        },
        "message": {
          name: 'message',
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
        "RoomChatId": {
          name: 'RoomChatId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
