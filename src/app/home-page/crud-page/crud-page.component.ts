import { ProfileDataApi } from './../../../shared/services/custom/ProfileData';
import { LoopBackConfig } from './../../../shared/lb.config';
import { StorageSimpleUploadApi } from './../../../shared/services/custom/StorageSimpleUpload';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss']
})
export class CrudPageComponent implements OnInit {

  public fullName: any;
  public address: any;
  public email: any;
  public placeBirth: any;
  public dateBirth: any;
  public noPhone: any;

  public idEdit: any;
  public fullNameEdit: any;
  public addressEdit: any;
  public emailEdit: any;
  public placeBirthEdit: any;
  public dateBirthEdit: any;
  public noPhoneEdit: any;
  public nameFile: any;
  public defaultFileTitle: any;
  public loopbackPathDownload: string = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/simpleupload/download/';
  public eventPhoto: any;
  public loopbackPathUpload: string = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/simpleupload/upload';

  public Datauser: any;
  public DatauserLength: any;
  public hiddenData: String = 'none';
  public hiddenTable: String = 'none';
  public alertVisible: any;
  public alertNotif: any;
  public displayModalEdit: any;
  public displayModalAdd: any;
  public visibleModal: any;
  constructor(
    private profileDataApi: ProfileDataApi
  ) {
    this.displayModalEdit = 'modal';
    this.displayModalAdd = 'modal';
    this.visibleModal = false;

    this.alertNotif = 'none';

    this.nameFile = '';
    this.defaultFileTitle = 'Name File';
  }

  ngOnInit() {
    this.loadData();
  }

  public uploadProses(event) {
    const name = event.path[0].files[0].name;
    const fileIMG = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    const formatImage = name.split('.').pop();
    const res = formatImage.toLowerCase();
    const that = this;
    const options = 'IMG_' + name;
    this.nameFile = options;
    this.defaultFileTitle = name;
    this.eventPhoto = event;
  }

  public createData() {
    this.profileDataApi.create({
      fullName: this.fullName,
      address: this.address,
      email: this.email,
      placeOfBirth: this.placeBirth,
      birthDate: this.dateBirth,
      noPhone: this.noPhone,
      photoProfile: this.nameFile
    }).subscribe((results) => {
      console.log('Sukses');
      this.create();
    }, (error) => {
      console.log(error);
    });
  }

  create() {
    if (this.nameFile === '') {
      console.log('Sorry Files Is Empty');
    } else {
      const filesToUpload = <Array<File>>this.eventPhoto.target.files;
      console.log('test' + this.eventPhoto.path[0].files[0].name);
      const urlSimpleUpload = this.loopbackPath + '/api/StorageSimpleUploads/simpleupload/upload';
      this.makeFileRequest(urlSimpleUpload, [], filesToUpload, this.nameFile).then((result) => {
        console.log(JSON.stringify(result));
        console.log('Sukses Upload');
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
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

}
