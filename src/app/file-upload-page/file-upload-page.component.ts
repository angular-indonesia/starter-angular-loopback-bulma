import { Component, OnInit } from '@angular/core';
import { StorageSimpleUploadApi } from './../../shared/services/custom/StorageSimpleUpload';
import { LoopBackConfig } from './../../shared/lb.config';
@Component({
  selector: 'app-home-page',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.scss']
})
export class FileUploadPageComponent implements OnInit {
  public nameSimpleFile: any;
  public titleOriginalFile: any;
  public loopbackPath: string = LoopBackConfig.getPath();
  public evenPhoto: any;
  constructor(
   
  ) {
    this.nameSimpleFile = "";
    this.titleOriginalFile = "Name File";
  }

  ngOnInit() {
  }
  uploadSimpleFile(event) {


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
      let filesToUpload = <Array<File>>this.evenPhoto.target.files;
      console.log("test" + this.evenPhoto.path[0].files[0].name);
      let urlSimpleUpload = this.loopbackPath + "/api/StorageSimpleUploads/profile/upload";
      this.makeFileRequest(urlSimpleUpload, [], filesToUpload, this.nameSimpleFile).then((result) => {
        console.log(JSON.stringify(result));

      }, (error) => {
        console.error(error);

      });
    }
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
