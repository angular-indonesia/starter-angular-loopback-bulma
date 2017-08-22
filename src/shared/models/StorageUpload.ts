/* tslint:disable */

declare var Object: any;
export interface StorageUploadInterface {
  "id"?: number;
}

export class StorageUpload implements StorageUploadInterface {
  "id": number;
  constructor(data?: StorageUploadInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StorageUpload`.
   */
  public static getModelName() {
    return "StorageUpload";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StorageUpload for dynamic purposes.
  **/
  public static factory(data: StorageUploadInterface): StorageUpload{
    return new StorageUpload(data);
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
      name: 'StorageUpload',
      plural: 'StorageUploads',
      path: 'StorageUploads',
      properties: {
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
