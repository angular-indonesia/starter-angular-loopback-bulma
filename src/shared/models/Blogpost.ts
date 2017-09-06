/* tslint:disable */

declare var Object: any;
export interface BlogpostInterface {
  "postdate"?: Date;
  "posttitle"?: string;
  "postcontent"?: string;
  "id"?: number;
}

export class Blogpost implements BlogpostInterface {
  "postdate": Date;
  "posttitle": string;
  "postcontent": string;
  "id": number;
  constructor(data?: BlogpostInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Blogpost`.
   */
  public static getModelName() {
    return "Blogpost";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Blogpost for dynamic purposes.
  **/
  public static factory(data: BlogpostInterface): Blogpost{
    return new Blogpost(data);
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
      name: 'Blogpost',
      plural: 'Blogposts',
      path: 'Blogposts',
      properties: {
        "postdate": {
          name: 'postdate',
          type: 'Date'
        },
        "posttitle": {
          name: 'posttitle',
          type: 'string'
        },
        "postcontent": {
          name: 'postcontent',
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
