import { ProfiledataApi } from './../../../shared/services/custom/Profiledata';
import { StorageSimpleUploadApi } from './../../../shared/services/custom/StorageSimpleUpload';

import { LoopBackConfig } from './../../../shared/lb.config';
import { Component, OnInit, Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss'],
  providers: [StorageSimpleUploadApi],
})
export class CrudPageComponent implements OnInit {

  public fullName: any;
  public address: any;
  public email: any;
  public placeBirth: any;
  public dateBirth: any;
  public noPhone: any;
  public folderName: any;
  public folder: any;
  public idEdit: any;
  public fullNameEdit: any;
  public addressEdit: any;
  public emailEdit: any;
  public placeBirthEdit: any;
  public dateBirthEdit: any;
  public noPhoneEdit: any;
  public photoEdit: any;
  public photoProfile: any;
  public nameFile: any;
  public defaultFileTitle: any;
  public loopbackPathDownload: string;
  public eventPhoto: any;
  public path: any;
  public pathLength: any;
  public pathDynamic: any;
  public Datauser: any;
  public DatauserLength: any;
  public hiddenData: String = 'none';
  public hiddenTable: String = 'none';
  public hiddenSuccess: String = 'none';
  public hiddenValid: String = 'none';
  public alertVisible: any;
  public alertNotif: any;
  public displayModalEdit: any;
  public displayModalAdd: any;
  public visibleModal: any;

  constructor(
    public profileDataApi: ProfiledataApi,
    public storageCustom: StorageSimpleUploadApi
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
    const uuid = UUID.UUID();

    const name = event.path[0].files[0].name;
    const fileIMG = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
    const formatImage = name.split('.').pop();
    const res = formatImage.toLowerCase();
    const that = this;
    const options = 'IMG_' + uuid + '.jpg';
    this.nameFile = options;
    this.defaultFileTitle = name;
    this.eventPhoto = event;
  }

  public prosesPhoto() {
    this.folderName = this.fullName;
    const newContainer = {
      'name': this.folderName
    };

    this.storageCustom.createContainer(newContainer)
      .subscribe((result) => {
        console.log('Sukses Create Container');
        const filesToUpload = <Array<File>>this.eventPhoto.target.files;
        const urlSimpleUpload = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/' + this.folderName + '/upload';
        this.makeFileRequest(urlSimpleUpload, [], filesToUpload, this.nameFile).then((results) => {
          console.log(JSON.stringify(results));
          console.log('Sukses Upload');


          this.fullName = '';
          this.address = '';
          this.email = '';
          this.placeBirth = '';
          this.dateBirth = '';
          this.noPhone = '';
          this.nameFile = '';

          this.hiddenSuccess = 'block';
          this.closedTimming();

          this.closeAdd();
          this.ngOnInit();

        }, (error) => {
          console.error(error);
        });
      });
  }

  public uploadFoto(event) {
    console.log(event, 'EVENT');
    if (this.nameFile === '') {
      console.log('Sorry Files Is Empty');
    } else {

      this.folderName = event;
      const newContainer = {
        'name': this.folderName
      };

      this.storageCustom.createContainer(newContainer)
        .subscribe((result) => {
          console.log('Sukses Create Container');
          const filesToUpload = <Array<File>>this.eventPhoto.target.files;
          const urlSimpleUpload = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/' + this.folderName + '/upload';
          this.makeFileRequest(urlSimpleUpload, [], filesToUpload, this.nameFile).then((results) => {
            console.log(JSON.stringify(results));
            console.log('Sukses Upload');


            this.fullName = '';
            this.address = '';
            this.email = '';
            this.placeBirth = '';
            this.dateBirth = '';
            this.noPhone = '';
            this.nameFile = '';

            this.hiddenSuccess = 'block';
            this.closedTimming();

            this.closeAdd();
            this.ngOnInit();

          }, (error) => {
            console.error(error);
          });
        });
    }
  }

  public createData() {
    if (this.nameFile === '') {
      console.log('Sorry Files Is Empty');
      this.hiddenValid = 'block';
      this.closedValid();
    } else {
      this.folderName = this.fullName + '_' + this.makeid().toString();
      console.log(this.folderName, 'FOLDER');
      this.profileDataApi.create({
        fullname: this.fullName,
        address: this.address,
        email: this.email,
        placeofbirth: this.placeBirth,
        birthdate: this.dateBirth,
        nophone: this.noPhone,
        folder: this.folderName,
        photoprofile: this.nameFile
      }).subscribe((results) => {
        console.log('Sukses');

        this.uploadFoto(this.folderName);

      }, (error) => {
        console.log(error);
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

  public loadData() {

    console.log('Data');
    this.profileDataApi.find({
      where: {
        fullname: { 'neq': '' }
      }
    }).subscribe((result) => {
      console.log(result, 'Data');
      this.path = result;
      console.log(this.path, 'PATH');
      this.pathLength = this.path.length;

      for (let i = 0; i > this.pathLength; i++) {
        this.pathDynamic = this.path.folder;
        console.log(this.pathDynamic, 'PATH DYNAMIC');
      }

      this.Datauser = result;
      console.log(this.Datauser, 'Datax');
      this.loopbackPathDownload = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/';
      this.DatauserLength = this.Datauser.length;
      console.log(this.DatauserLength);

      if (this.DatauserLength !== 0) {
        this.hiddenData = 'none';
        this.hiddenTable = 'block';
      } else {
        this.hiddenData = 'block';
        this.hiddenTable = 'none';
      }
    });
  }

  public listSelect(datas) {
    this.visibleModal = !this.visibleModal;
    this.displayModalEdit = this.visibleModal ? 'modal is-active' : 'modal';

    console.log(datas, 'Data Klik');
    this.idEdit = datas.id;
    this.fullNameEdit = datas.fullname;
    this.addressEdit = datas.address;
    this.emailEdit = datas.email;
    this.placeBirthEdit = datas.placeofbirth;
    this.dateBirthEdit = datas.birthdate;
    this.folder = datas.folder;
    this.noPhoneEdit = datas.nophone;
    this.photoProfile = datas.photoprofile;
  }

  public modalAdd() {
    this.visibleModal = !this.visibleModal;
    this.displayModalAdd = this.visibleModal ? 'modal is-active' : 'modal';
  }

  public closeAdd() {
    this.visibleModal = !this.visibleModal;
    this.displayModalAdd = this.visibleModal ? 'modal is-active' : 'modal';
  }

  public closeEdit() {
    this.visibleModal = !this.visibleModal;
    this.displayModalEdit = this.visibleModal ? 'modal is-active' : 'modal';
  }

  public closeAlert() {
    this.hiddenSuccess = 'none';
  }
  public closeValid() {
    this.hiddenValid = 'none';
  }

  public saveChange(datas) {
    console.log(this.idEdit, 'Data');
    const editId = datas;
    console.log(this.folder, 'Folder');
    console.log(this.nameFile, 'NAMA FOTO EDIT');

    if (this.nameFile !== '') {
      const dataEdit = {
        fullname: this.fullNameEdit,
        address: this.addressEdit,
        email: this.emailEdit,
        placeofbirth: this.placeBirthEdit,
        birthdate: this.dateBirthEdit,
        nophone: this.noPhoneEdit,
        folder: this.folder,
        photoprofile: this.nameFile
      };

      this.profileDataApi.findById(this.idEdit).subscribe((result) => {
        const results = result;
        this.profileDataApi.updateAttributes(this.idEdit, dataEdit).subscribe((record) => {
          console.log(record);
          this.editPhoto(this.folder);
        });
      });
    } else {
      const dataEdits = {
        fullname: this.fullNameEdit,
        address: this.addressEdit,
        email: this.emailEdit,
        placeofbirth: this.placeBirthEdit,
        birthdate: this.dateBirthEdit,
        nophone: this.noPhoneEdit,
        folder: this.folder,
        photoprofile: this.photoProfile
      };

      this.profileDataApi.findById(this.idEdit).subscribe((result) => {
        const results = result;
        this.profileDataApi.updateAttributes(this.idEdit, dataEdits).subscribe((record) => {
          console.log(record, 'Cuy');

          this.fullNameEdit = '';
          this.addressEdit = '';
          this.emailEdit = '';
          this.placeBirthEdit = '';
          this.dateBirthEdit = '';
          this.noPhoneEdit = '';
          this.nameFile = '';

          this.hiddenSuccess = 'block';
          this.closedTimming();

          this.closeEdit();
          this.ngOnInit();

        });
      });
    }
  }

  public closedTimming() {
    setTimeout(() => {
      this.hiddenSuccess = 'none';
    }, 3000);
  }

  public closedValid() {
    setTimeout(() => {
      this.hiddenValid = 'none';
    }, 3000);
  }

  public editPhoto(event) {
    console.log(event);
    if (this.nameFile === '') {
      console.log('Sorry Files Is Empty');
    } else {

      const filesToUpload = <Array<File>>this.eventPhoto.target.files;
      const urlSimpleUpload = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/' + this.folder + '/upload';
      this.makeFileRequest(urlSimpleUpload, [], filesToUpload, this.nameFile).then((results) => {
        console.log(JSON.stringify(results));
        console.log('Sukses Upload');


        this.fullNameEdit = '';
        this.addressEdit = '';
        this.emailEdit = '';
        this.placeBirthEdit = '';
        this.dateBirthEdit = '';
        this.noPhoneEdit = '';
        this.nameFile = '';

        this.hiddenSuccess = 'block';
        this.closedTimming();

        this.closeEdit();
        this.ngOnInit();

      }, (error) => {
        console.error(error);
      });
    }
  }

  public makeid() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 12; i++) {
      const text = possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  }

}
