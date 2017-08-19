import { Component, OnInit, NgModule } from '@angular/core';
import { StorageSimpleUploadApi } from './../../shared/services/custom/StorageSimpleUpload';
import { LoopBackConfig } from './../../shared/lb.config';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './file-upload-advance-page.component.html',
  styleUrls: ['./file-upload-advance-page.component.scss']
})

export class FileUploadAdvancePageComponent implements OnInit {
  public nameSimpleFile: any;
  public titleOriginalFile: any;
  public loopbackPath: string = LoopBackConfig.getPath()+"/api/StorageSimpleUploads/";
  public evenPhoto: any;
  public name_container: any = "";
  public dataPhoto: any;
  public urlSimpleDownload: any = "";
   public urlSimpleUpload: any = "";
  constructor(
    public storagesimpleuploadapi: StorageSimpleUploadApi
  ) {
    this.nameSimpleFile = "";
    this.titleOriginalFile = "Name File";
  }

  ngOnInit() {
  }
  addFile(event) {
    let name = event.path[0].files[0].name;
    let fileIMG = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    let formatImage = name.split('.').pop();
    let res = formatImage.toLowerCase();
    const that = this;
    let options = 'IMG_' + name;
    this.nameSimpleFile = options;
    this.titleOriginalFile = name;
    this.evenPhoto = event;
  }

  upload() {
    if (this.nameSimpleFile == "") {
      console.log("Sorry Files Is Empty");
    } else {
      this.createRequestFile("profile");

    }
  }

  createAndUpload() {
    if (this.nameSimpleFile == "" && this.name_container == "") {
      console.log("Sorry Files Is Empty");
    } else {
      console.log(this.name_container);
      let data = {
        "name": "" + this.name_container.toLowerCase()
      }
      this.storagesimpleuploadapi.createContainer(data)
        .subscribe(() => {
          this.createRequestFile(this.name_container);
        }, (error) => {
          if (error.status == 500) {
            this.createRequestFile(this.name_container);
          } else {
            console.log(error);
          }

        });
    }
  }

  createRequestFile(nameContainer) {
    let filesToUpload = <Array<File>>this.evenPhoto.target.files;
    console.log("test" + this.evenPhoto.path[0].files[0].name);
    this.urlSimpleUpload = this.loopbackPath + "" + nameContainer + "/upload";
    this.makeFileRequest(this.urlSimpleUpload, [], filesToUpload, this.nameSimpleFile).then((result) => {
      this.dataPhoto = {
        "nameFile": result['result'].files.file[0].name,
        "nameContainer": result['result'].files.file[0].container
      }    
      this.urlSimpleDownload = this.loopbackPath +""+this.dataPhoto.nameContainer+"/download/"+this.dataPhoto.nameFile;
      console.log(this.urlSimpleDownload);
    }, (error) => {
      console.error(JSON.stringify(error));

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
}
