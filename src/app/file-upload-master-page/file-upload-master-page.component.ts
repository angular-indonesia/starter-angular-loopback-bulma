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


  public itemContainer: any;
  public itemFileContainer: any;
  public hiddenTable: any = "hidden";
  public loopbackPath: string = LoopBackConfig.getPath() + "/api/StorageSimpleUploads/";
  public displayFolder: any = "block";
  public displayFile: any = "none";

  //VARIABEL UPDATE File
  nameSimpleFile: any;
  titleOriginalFile: any;
  evenPhoto: any;
  nameContainer:any;
  public displayModalUpdate: any = "";
  public visibleUpdate: any;
  public urlUpdate:any;

  constructor(
    public storageSimpleUpload: StorageSimpleUploadApi
  ) {
    this.showDataContainer();
    this.displayModalUpdate = "modal";
    this.visibleUpdate = false;
  }

  ngOnInit() {
  }
  modalupdateFile(nameFile,nameContainer) {
    this.visibleUpdate = !this.visibleUpdate;
    this.displayModalUpdate = this.visibleUpdate ? 'modal is-active' : 'modal';
    this.titleOriginalFile = nameFile;
    this.nameContainer = nameContainer;
  }
  closemodalupdateFile() {
    this.visibleUpdate = !this.visibleUpdate;
    this.displayModalUpdate = this.visibleUpdate ? 'modal is-active' : 'modal';
  }
  displayListStorage() {
    this.displayFolder === 'none' ? this.displayFolder = 'block' : this.displayFolder = 'none';
    this.displayFile === 'none' ? this.displayFile = 'block' : this.displayFile = 'none';

  }
  addFile(event) {
    let name = event.path[0].files[0].name;
    let fileIMG = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    let formatImage = name.split('.').pop();
    let res = formatImage.toLowerCase();
    const that = this;
    
    this.nameSimpleFile = name;

    this.evenPhoto = event;
  }
  createRequestFile() {
    let filesToUpload = <Array<File>>this.evenPhoto.target.files;
    console.log("test" + this.evenPhoto.path[0].files[0].name);
    this.urlUpdate = this.loopbackPath + "" + this.nameContainer + "/upload";
    this.makeFileRequest(this.urlUpdate, [], filesToUpload, this.titleOriginalFile).then((result) => {
   this.closemodalupdateFile();
     
    }, (error) => {
    

    });
  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>, options) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('file', files[0], options);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
  public showDataContainer() {
    this.storageSimpleUpload.getContainers().subscribe(
      result => {
        this.itemContainer = result;
        console.log(JSON.stringify(this.itemContainer));
      },
      error => {

      }
    )
  }
  deleteContainer(nameContainer) {
    this.storageSimpleUpload.destroyContainer(nameContainer).subscribe(
      result => {
        this.showDataContainer();
      },
      error => {

      }
    )
    console.log(nameContainer);
  }
  getFileContainer(nameContainer, index) {
    this.displayFolder === 'none' ? this.displayFolder = 'block' : this.displayFolder = 'none';
    this.displayFile === 'none' ? this.displayFile = 'block' : this.displayFile = 'none';
    this.storageSimpleUpload.getFiles(nameContainer).subscribe(
      result => {
        this.itemFileContainer = result;

        console.log(JSON.stringify(this.itemFileContainer[0]));
      },
      error => {

      }
    )
    console.log(nameContainer);
  }

  deleteFileContainer(nameContainer, nameFile, index) {
    this.storageSimpleUpload.removeFile(nameContainer, nameFile).subscribe(
      result => {
        console.log(JSON.stringify(result));
        this.getFileContainer(nameContainer, index);
      },
      error => {

      }
    )
    console.log(nameContainer);
  }

}
