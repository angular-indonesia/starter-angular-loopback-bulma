/* tslint:disable */
import { Injectable } from '@angular/core';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { UserPhoto } from '../../models/UserPhoto';
import { UserCredential } from '../../models/UserCredential';
import { StorageSimpleUpload } from '../../models/StorageSimpleUpload';
import { Todo } from '../../models/Todo';
import { Roomchat } from '../../models/Roomchat';
import { Chatdetail } from '../../models/Chatdetail';
import { StorageUpload } from '../../models/StorageUpload';
import { Map } from '../../models/Map';
import { Profiledata } from '../../models/Profiledata';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    RoleMapping: RoleMapping,
    Role: Role,
    UserPhoto: UserPhoto,
    UserCredential: UserCredential,
    StorageSimpleUpload: StorageSimpleUpload,
    Todo: Todo,
    Roomchat: Roomchat,
    Chatdetail: Chatdetail,
    StorageUpload: StorageUpload,
    Map: Map,
    Profiledata: Profiledata,
    
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
