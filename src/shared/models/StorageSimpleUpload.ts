/* tslint:disable */

declare var Object: any;
export interface StorageSimpleUploadInterface {
  "id"?: number;
}

export class StorageSimpleUpload implements StorageSimpleUploadInterface {
  "id": number;
  constructor(data?: StorageSimpleUploadInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StorageSimpleUpload`.
   */
  public static getModelName() {
    return "StorageSimpleUpload";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StorageSimpleUpload for dynamic purposes.
  **/
  public static factory(data: StorageSimpleUploadInterface): StorageSimpleUpload{
    return new StorageSimpleUpload(data);
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
      name: 'StorageSimpleUpload',
      plural: 'StorageSimpleUploads',
      path: 'StorageSimpleUploads',
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
