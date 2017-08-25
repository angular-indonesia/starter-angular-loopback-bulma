/* tslint:disable */
import { Injectable } from '@angular/core';
import { UserPhoto } from '../../models/UserPhoto';
import { UserCredential } from '../../models/UserCredential';
import { StorageSimpleUpload } from '../../models/StorageSimpleUpload';
import { ProfileData } from '../../models/ProfileData';
import { Maps } from '../../models/Maps';
import { Todo } from '../../models/Todo';
import { Roomchat } from '../../models/Roomchat';
import { Chatdetail } from '../../models/Chatdetail';
import { StorageUpload } from '../../models/StorageUpload';
import { BlogPost } from '../../models/BlogPost';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    UserPhoto: UserPhoto,
    UserCredential: UserCredential,
    StorageSimpleUpload: StorageSimpleUpload,
    ProfileData: ProfileData,
    Maps: Maps,
    Todo: Todo,
    Roomchat: Roomchat,
    Chatdetail: Chatdetail,
    StorageUpload: StorageUpload,
    BlogPost: BlogPost,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
