import { Component, OnInit, NgModule } from '@angular/core';
import { StorageSimpleUploadApi } from './../../shared/services/custom/StorageSimpleUpload';
import { LoopBackConfig } from './../../shared/lb.config';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './file-upload-master-page.component.html',
  styleUrls: ['./file-upload-master-page.component.scss']
})

export class FileUploadMasterPageComponent implements OnInit {
public itemContainer : any;
public itemFileContainer : any = [];
public hiddenTable:any= "hidden";
  constructor(
    public storageSimpleUpload : StorageSimpleUploadApi 
  ) {
  this.showDataContainer();
  }

  ngOnInit() {
  }
  public showDataContainer(){
     this.storageSimpleUpload.getContainers().subscribe(
        result => {
          this.itemContainer = result;
          console.log(JSON.stringify(this.itemContainer));
        },
        error => {
         
        }
      )
  }
  deleteContainer(nameContainer){
this.storageSimpleUpload.destroyContainer(nameContainer).subscribe(
        result => {         
         this.showDataContainer();
        },
        error => {
         
        }
      )
    console.log(nameContainer);
  }
  getFileContainer(nameContainer,index){
       this.storageSimpleUpload.getFiles(nameContainer).subscribe(
        result => {
          this.itemFileContainer[index] = result;
          
          console.log(JSON.stringify(this.itemFileContainer[index][0]));
        },
        error => {
         
        }
      )
    console.log(nameContainer);
  }

deleteFileContainer(nameContainer,nameFile,index){
this.storageSimpleUpload.removeFile(nameContainer,nameFile).subscribe(
        result => {         
          console.log(JSON.stringify(result));
          this.getFileContainer(nameContainer,index);
        },
        error => {
         
        }
      )
    console.log(nameContainer);
}
}
