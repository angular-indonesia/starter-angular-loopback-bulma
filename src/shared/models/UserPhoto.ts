/* tslint:disable */

declare var Object: any;
export interface UserPhotoInterface {
  "id"?: string;
  "userid": string;
  "username": string;
  "photo": string;
}

export class UserPhoto implements UserPhotoInterface {
  "id": string;
  "userid": string;
  "username": string;
  "photo": string;
  constructor(data?: UserPhotoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserPhoto`.
   */
  public static getModelName() {
    return "UserPhoto";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserPhoto for dynamic purposes.
  **/
  public static factory(data: UserPhotoInterface): UserPhoto{
    return new UserPhoto(data);
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
      name: 'UserPhoto',
      plural: 'UserPhotos',
      path: 'UserPhotos',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "userid": {
          name: 'userid',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "photo": {
          name: 'photo',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
