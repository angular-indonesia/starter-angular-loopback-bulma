import { ProfileDataApi } from './../../../shared/services/custom/ProfileData';
import { LoopBackConfig } from './../../../shared/lb.config';
import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

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
  public loopbackPathDownload: string = LoopBackConfig.getPath() + '/api/StorageUploads/Angular/download/';
  public eventPhoto: any;
  // public loopbackPathUpload: string = LoopBackConfig.getPath() + '/api/StorageSimpleUploads/simpleupload/upload';

  public Datauser: any;
  public DatauserLength: any;
  public hiddenData: String = 'none';
  public hiddenTable: String = 'none';
  public hiddenSuccess: String = 'none';
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

    if (this.nameFile === '') {
      console.log('Sorry Files Is Empty');
    } else {
      const filesToUpload = <Array<File>>this.eventPhoto.target.files;

      const urlSimpleUpload = LoopBackConfig.getPath() + '/api/StorageUploads/Angular/upload';
      this.makeFileRequest(urlSimpleUpload, [], filesToUpload, this.nameFile).then((result) => {
        console.log(JSON.stringify(result));
        console.log('Sukses Upload');
      }, (error) => {
        console.error(error);
      });
    }
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
      console.log(error);
    });
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
        fullName: { 'neq': '' }
      }
    }).subscribe((result) => {
      console.log(result, 'Data');
      this.Datauser = result;
      console.log(this.Datauser, 'Datax');
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
    this.fullNameEdit = datas.fullName;
    this.addressEdit = datas.address;
    this.emailEdit = datas.email;
    this.placeBirthEdit = datas.placeOfBirth;
    this.dateBirthEdit = datas.birthDate;
    this.noPhoneEdit = datas.noPhone;
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

  public saveChange(idEdit) {
    console.log(idEdit, 'ID Edit');
    const editId = idEdit;

    const dataEdit = {
      fullName: this.fullNameEdit,
      address: this.addressEdit,
      email: this.emailEdit,
      placeOfBirth: this.placeBirthEdit,
      birthDate: this.dateBirthEdit,
      noPhone: this.noPhoneEdit
    };

    this.profileDataApi.updateAttributes(
      { id: editId },
      { data: dataEdit },
      function (err, info) {
        console.log(err);
      });
    //   this.profileDataApi.updateAll({
    //     { id: this.idEdit },
    //     {  }

    // })
    //   this.profileDataApi.create({
    //   }).subscribe((result) => {
    //     console.log('Sukses Edit');
    //   });
  }

}
