/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { UserPhoto } from '../../models/UserPhoto';
import { StorageSimpleUpload } from '../../models/StorageSimpleUpload';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    UserPhoto: UserPhoto,
    StorageSimpleUpload: StorageSimpleUpload,
    
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
