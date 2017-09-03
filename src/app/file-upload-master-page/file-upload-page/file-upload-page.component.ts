import { Component, OnInit, NgModule } from '@angular/core';
import { StorageSimpleUploadApi } from './../../../shared/services/custom/StorageSimpleUpload';
import { LoopBackConfig } from './../../../shared/lb.config';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.scss']
})

export class FileUploadPageComponent implements OnInit {
  public nameSimpleFile: any;
  public titleOriginalFile: any;
  public loopbackPath: string = LoopBackConfig.getPath() + "/api/StorageSimpleUploads/";
  public evenPhoto: any;
  public name_container: any = "";
  public dataPhoto: any;
  public urlSimpleDownload: any = "";
  public urlSimpleUpload: any = "";

  public itemFolder: any;
  public eventFolder: any;
  public displayInputFolder: any = "none";

  public classNotif: any = "notification is-success";
  public displayNotif: any = "none";
  public messageNotif: any = "notif";
  constructor(
    public storagesimpleuploadapi: StorageSimpleUploadApi
  ) {
    this.nameSimpleFile = "";
    this.titleOriginalFile = "Name File";

    this.showDataFolder();
  }

  ngOnInit() {
  }
  public choosefolder(val: String) {
    this.eventFolder = val;
    console.log(this.eventFolder);
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



  createAndUpload() {
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
      let data = {
        "name": "" + this.name_container.toLowerCase()
      }
      this.storagesimpleuploadapi.createContainer(data)
        .subscribe(() => {
          this.createRequestFile(folder);
        }, (error) => {
          if (error.statusCode == 500) {
            this.createRequestFile(folder);
          } else {
            //  this.createRequestFile(this.name_container);
            console.log(error);
            this.classNotif = "notification is-danger";
            this.displayNotif = "block";
            this.messageNotif = "Failed To Upload";
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

      this.urlSimpleDownload = this.loopbackPath + "" + this.dataPhoto.nameContainer + "/download/" + this.dataPhoto.nameFile;
      console.log(this.urlSimpleDownload);
      this.classNotif = "notification is-success";
      this.displayNotif = "block";
      this.messageNotif = "Succes To Upload";
    }, (error) => {
      this.classNotif = "notification is-danger";
      this.displayNotif = "block";
      this.messageNotif = "Failde To Upload";

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
