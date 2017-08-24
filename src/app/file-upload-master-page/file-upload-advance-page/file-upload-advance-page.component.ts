import { Component, OnInit, NgModule } from '@angular/core';
import { StorageSimpleUploadApi } from './../../../shared/services/custom/StorageSimpleUpload';
import { LoopBackConfig } from './../../../shared/lb.config';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './file-upload-advance-page.component.html',
  styleUrls: ['./file-upload-advance-page.component.scss']
})

export class FileUploadAdvancedPageComponent implements OnInit {
  public name_container: any = "";
  public itemFile: any = [];
  public urlSimpleUpload: any;
  public loopbackPath: string = LoopBackConfig.getPath() + "/api/StorageSimpleUploads/";
  public dataUpload: any;
  public dataStatus: any;

  /// Variabel Upload File Custom
  public name_container_custom: any = "";
  public itemFileCustom: any = [];
  public urlUploadCustom: any;
  public loopbackPathCustom: string = LoopBackConfig.getPath() + "/api/StorageSimpleUploads/";
  public dataUploadCustom: any;
  public dataStatusCustom: any;
  constructor(
    public storagesimpleuploadapi: StorageSimpleUploadApi,

  ) {



  }

  ngOnInit() {
  }

  addFileMultiple(event) {

    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let evenUpload = <File>event.target.files[i];
      evenUpload["buttonname"] = "upload";
      evenUpload["isdisabled"] = false;
      evenUpload["download_path"] = "";

      this.itemFile.push(evenUpload);
      console.log(this.itemFile);

    }
  }

  deleteSingleFile(i){
    this.itemFile.splice(i);
  }
  uploadSingle(i) {

    console.log(i);
    let filesToUpload = this.itemFile[i];
    console.log("test" + filesToUpload);
    this.urlSimpleUpload = this.loopbackPath + "" + this.name_container + "/upload";
    console.log(this.urlSimpleUpload);
    let data = {
      "name": "" + this.name_container.toLowerCase()
    }
    this.storagesimpleuploadapi.createContainer(data)
      .subscribe(() => {
        console.log(filesToUpload.name);
        this.sendRequestSingleUpload(this.urlSimpleUpload, filesToUpload, filesToUpload.name).then((result) => {
          this.dataUpload = {
            "nameFile": result['result'].files.file[0].name,
            "nameContainer": result['result'].files.file[0].container,
            "index": i
          }
          this.itemFile[i].buttonname = "done";
          this.itemFile[i].isdisabled = true;

        }, (error) => {
          console.error(error);
        });
      }, (error) => {
        if (error.statusCode == 500) {
          this.sendRequestSingleUpload(this.urlSimpleUpload, filesToUpload, filesToUpload.name).then((result) => {
            this.dataUpload = {
              "nameFile": result['result'].files.file[0].name,
              "nameContainer": result['result'].files.file[0].container,
              "index": i

            }
            this.itemFile[i].buttonname = "done";
            this.itemFile[i].isdisabled = true;
        
          }, (error) => {
            console.error(error);
          });
          // this.createRequestFile(this.name_container);
        } else {
          console.log(error);

        }

      });

  }

  sendRequestSingleUpload(url: string, files: File, options) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('file', files, options);
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
  uploadMultiple() {
    if (this.name_container == "") {
      console.log("ups");
      alert("Please Insert Folder Name");
    } 
    else if(this.itemFile[0] == null){
      alert("Please Attach File");
    }
    else {
      let filesToUpload = <Array<File>>this.itemFile;
      console.log("test" + filesToUpload);
      this.urlSimpleUpload = this.loopbackPath + "" + this.name_container + "/upload";
      console.log(this.urlSimpleUpload);
      let data = {
        "name": "" + this.name_container.toLowerCase()
      }
      this.storagesimpleuploadapi.createContainer(data)
        .subscribe(() => {

          this.sendRequestMultipleUpload(this.urlSimpleUpload, [], filesToUpload).then((result) => {

          }, (error) => {
            console.error(error);
          });
        }, (error) => {
          if (error.statusCode == 500) {
            this.sendRequestMultipleUpload(this.urlSimpleUpload, [], filesToUpload).then((result) => {


            }, (error) => {
              console.error(error);
            });
            // this.createRequestFile(this.name_container);
          } else {
            console.log(error);

          }

        });
    }
  }

  sendRequestMultipleUpload(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let a = 0; a < files.length; a++) {
        formData.append('file', files[a], files[a].name);
      }
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

    addFileCustom(event) {

    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let evenUploadCustom = <File>event.target.files[i];
      evenUploadCustom["buttonname"] = "upload";
      evenUploadCustom["isdisabled"] = false;
      evenUploadCustom["download_path"] = "";

      this.itemFileCustom.push(evenUploadCustom);
      console.log(this.itemFileCustom);

    }
  }
   uploadCustom() {
    if (this.name_container_custom == "" ) {
      console.log("ups");
      alert("Please Insert Folder Name");
    } 
     else if(this.itemFileCustom[0] == null){
      alert("Please Attach File");
    }
    else {
      let filesToUploadCustom = <Array<File>>this.itemFileCustom;
      console.log("test" + filesToUploadCustom);
      this.urlUploadCustom = this.loopbackPathCustom + "" + this.name_container_custom + "/upload";
      console.log(this.urlUploadCustom);
      let data = {
        "name": "" + this.name_container_custom.toLowerCase()
      }
      this.storagesimpleuploadapi.createContainer(data)
        .subscribe(() => {

          this.sendRequestCustomUpload(this.urlUploadCustom, [], filesToUploadCustom).then((result) => {

          }, (error) => {
            console.error(error);
          });
        }, (error) => {
          if (error.statusCode == 500) {
            this.sendRequestCustomUpload(this.urlUploadCustom, [], filesToUploadCustom).then((result) => {


            }, (error) => {
              console.error(error);
            });
            // this.createRequestFile(this.name_container);
          } else {
            console.log(error);

          }

        });
    }
  }

  sendRequestCustomUpload(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let a = 0; a < files.length; a++) {
        formData.append('file', files[a], files[a].name);
      }
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

