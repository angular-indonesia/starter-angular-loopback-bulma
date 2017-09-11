import { Component, OnInit, NgModule } from '@angular/core';
import { StorageSimpleUploadApi } from './../../../shared/services/custom/StorageSimpleUpload';
import { LoopBackConfig } from './../../../shared/lb.config';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './file-upload-advance-page.component.html',
  styleUrls: ['./file-upload-advance-page.component.scss'],
  providers: [StorageSimpleUploadApi],
})

export class FileUploadAdvancedPageComponent implements OnInit {
  public name_container: any = "";
  public itemFile: any = [];
  public urlSimpleUpload: any;
  public loopbackPath: string = LoopBackConfig.getPath() + "/api/StorageSimpleUploads/";
  public dataUpload: any;
  public dataStatus: any;
  public itemFolder: any;
  public eventFolder: any;
  public displayInputFolder: any = "none";

  /// Variabel Upload File Custom
  public name_container_custom: any = "";
  public itemFileCustom: any = [];
  public urlUploadCustom: any;
  public loopbackPathCustom: string = LoopBackConfig.getPath() + "/api/StorageSimpleUploads/";
  public dataUploadCustom: any;
  public dataStatusCustom: any;
  public itemFolderCustom: any;
  public eventFolderCustom: any;
  public displayInputFolderCustom: any = "none";

  public classNotif: any = "notification is-success";
  public displayNotif: any = "none";
  public messageNotif: any = "notif";
  constructor(
    public storagesimpleuploadapi: StorageSimpleUploadApi,

  ) {

    this.showDataFolder();

  }

  ngOnInit() {
  }

  toggle() {
    this.displayNotif = "none";
  }
  public showDataFolder() {
    this.storagesimpleuploadapi.getContainers().subscribe(
      result => {
        this.itemFolder = result;
        console.log(JSON.stringify(this.itemFolder));
      },
      error => {

      }
    )
  }
  displayInput() {
    this.displayInputFolder === 'none' ? this.displayInputFolder = 'block' : this.displayInputFolder = 'none';
    this.name_container = "";
  }
  public choosefolder(val: String) {
    this.eventFolder = val;
    console.log(this.eventFolder);
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

  deleteSingleFile(i) {
    this.itemFile.splice(i);
  }
  uploadSingle(i) {
    let folder = "";
    if (this.name_container == "") {
      folder = this.eventFolder;

    }
    else {
      folder = this.name_container;
    }
    if (folder == null) {

      this.classNotif = "notification is-danger";
      this.displayNotif = "block";
      this.messageNotif = "Please Choose Folder or Add New Folder";
      console.log("ups");
    } else {
      console.log(i);
      let filesToUpload = this.itemFile[i];
      console.log("test" + filesToUpload);
      this.urlSimpleUpload = this.loopbackPath + "" + folder + "/upload";
      console.log(this.urlSimpleUpload);
      let data = {
        "name": "" + folder.toLowerCase()
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
            this.classNotif = "notification is-danger";
            this.displayNotif = "block";
            this.messageNotif = "Failed To Upload";
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
              this.classNotif = "notification is-success";
              this.displayNotif = "block";
              this.messageNotif = "success To Upload";

            }, (error) => {
              console.error(error);
              this.classNotif = "notification is-success";
              this.displayNotif = "block";
              this.messageNotif = "success To Upload";
              console.error(error);
            });
            // this.createRequestFile(this.name_container);
          } else {
            console.log(error);
            this.classNotif = "notification is-danger";
            this.displayNotif = "block";
            this.messageNotif = "Failed To Upload";
            console.error(error);
          }

        });
    }

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
    let folder = "";
    if (this.itemFile[0] == null) {
      this.classNotif = "notification is-danger";
      this.displayNotif = "block";
      this.messageNotif = "Please Add File From Your Computer";
    }
    else {

      if (this.name_container == "") {
        folder = this.eventFolder;

      }
      else {
        folder = this.name_container;
      }
      if (folder == null) {

        this.classNotif = "notification is-danger";
        this.displayNotif = "block";
        this.messageNotif = "Please Choose Folder or Add New Folder";
        console.log(folder);
      } else {
        console.log(folder);
        let filesToUpload = <Array<File>>this.itemFile;
        console.log("test" + filesToUpload);
        this.urlSimpleUpload = this.loopbackPath + "" + folder + "/upload";
        console.log(this.urlSimpleUpload);
        let data = {
          "name": "" + folder.toLowerCase()
        }
        this.storagesimpleuploadapi.createContainer(data)
          .subscribe(() => {

            this.sendRequestMultipleUpload(this.urlSimpleUpload, [], filesToUpload).then((result) => {
              this.classNotif = "notification is-success";
              this.displayNotif = "block";
              this.messageNotif = "success To Upload";
              this.itemFile = [];

            }, (error) => {
              this.classNotif = "notification is-danger";
              this.displayNotif = "block";
              this.messageNotif = "Failed To Upload";
              console.error(error);
            });
          }, (error) => {
            if (error.statusCode == 500) {
              this.sendRequestMultipleUpload(this.urlSimpleUpload, [], filesToUpload).then((result) => {
                this.classNotif = "notification is-success";
                this.displayNotif = "block";
                this.messageNotif = "Succes To Upload";
                this.itemFile = [];
                console.error(error);
               

              }, (error) => {
                this.classNotif = "notification is-danger";
                this.displayNotif = "block";
                this.messageNotif = "Failed To Upload";
                console.error(error);
              });
              // this.createRequestFile(this.name_container);
            } else {
              this.classNotif = "notification is-danger";
              this.displayNotif = "block";
              this.messageNotif = "Failed To Upload";
              console.log(error);

            }

          });
      }
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

  displayInputCustom() {
    this.displayInputFolderCustom === 'none' ? this.displayInputFolderCustom = 'block' : this.displayInputFolderCustom = 'none';
    this.name_container_custom = "";
  }
  public choosefolderCustom(val: String) {
    this.eventFolderCustom = val;
    console.log(this.eventFolderCustom);
  }
  addFileCustom(event) {

    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let evenUploadCustom = <File>event.target.files[i];
      evenUploadCustom["buttonname"] = "upload";
      evenUploadCustom["isdisabled"] = false;
      evenUploadCustom["download_path"] = "";

      this.itemFileCustom.push(evenUploadCustom);
      console.log(this.itemFileCustom[0].name);

    }
  }
  uploadCustom() {
    let folder = "";
    if (this.itemFileCustom[0] == null) {
      this.classNotif = "notification is-danger";
      this.displayNotif = "block";
      this.messageNotif = "Please Add File From Your Computer";
    }
    else {

      if (this.name_container_custom == "") {
        folder = this.eventFolderCustom;

      }
      else {
        folder = this.name_container_custom;
      }
      if (folder == null) {

        this.classNotif = "notification is-danger";
        this.displayNotif = "block";
        this.messageNotif = "Please Choose Folder or Add New Folder";
        console.log(folder);
      } else {
        let filesToUploadCustom = <Array<File>>this.itemFileCustom;
        console.log("test" + filesToUploadCustom);
        this.urlUploadCustom = this.loopbackPathCustom + "" + folder + "/upload";
        console.log(this.urlUploadCustom);
        let data = {
          "name": "" + folder.toLowerCase()
        }
        this.storagesimpleuploadapi.createContainer(data)
          .subscribe(() => {

            this.sendRequestCustomUpload(this.urlUploadCustom, [], filesToUploadCustom).then((result) => {
              this.classNotif = "notification is-success";
              this.displayNotif = "block";
              this.messageNotif = "Success To Upload";
            }, (error) => {
              this.classNotif = "notification is-danger";
              this.displayNotif = "block";
              this.messageNotif = "Failed To Upload";
              console.error(error);
            });
          }, (error) => {
            if (error.statusCode == 500) {
              this.sendRequestCustomUpload(this.urlUploadCustom, [], filesToUploadCustom).then((result) => {
                this.classNotif = "notification is-success";
                this.displayNotif = "block";
                this.messageNotif = "Success To Upload";

              }, (error) => {
                this.classNotif = "notification is-danger";
                this.displayNotif = "block";
                this.messageNotif = "Failed To Upload";
                console.error(error);
              });
              // this.createRequestFile(this.name_container);
            } else {
              this.classNotif = "notification is-danger";
              this.displayNotif = "block";
              this.messageNotif = "Failed To Upload";
              console.log(error);

            }

          });
      }
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

