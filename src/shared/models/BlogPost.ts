/* tslint:disable */

declare var Object: any;
export interface BlogPostInterface {
  "postContent"?: any;
  "postDate"?: Date;
  "postId"?: string;
  "postTitle"?: string;
}

export class BlogPost implements BlogPostInterface {
  "postContent": any;
  "postDate": Date;
  "postId": string;
  "postTitle": string;
  constructor(data?: BlogPostInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BlogPost`.
   */
  public static getModelName() {
    return "BlogPost";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BlogPost for dynamic purposes.
  **/
  public static factory(data: BlogPostInterface): BlogPost{
    return new BlogPost(data);
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
      name: 'BlogPost',
      plural: 'BlogPosts',
      path: 'BlogPosts',
      properties: {
        "postContent": {
          name: 'postContent',
          type: 'any'
        },
        "postDate": {
          name: 'postDate',
          type: 'Date'
        },
        "postId": {
          name: 'postId',
          type: 'string'
        },
        "postTitle": {
          name: 'postTitle',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
