import { Maps } from './../../shared/models/Maps';
import { MapsApi } from './../../shared/services/custom/Maps';
import { Component, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, AgmCoreModule, AgmInfoWindow } from '@agm/core';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss']
})
export class MapsPageComponent implements OnInit {

    public item: Maps = new Maps();
    public insertLocation: any;
    public insertLongitude: any;
    public insertLatitude: any;
    public insertUser: any;

    title: String = 'My first AGM project';
    lat: number = -6.2841462;
    lng: Number = 106.7264780;
    latJakarta: number = -6.206519;
    lngJakarta: Number = 106.850789;
    latTangerang: number = -6.2841462;
    lngTangerang: Number = 106.7264780;
    latBekasi: number = -6.238039;
    lngBekasi: Number = 106.975628;
    latBandung: number = -6.918441;
    lngBandung: Number = 107.612941;
    latBogor: number = -6.599963;
    lngBogor: Number = 106.805621;
    visible: any;
    visibleInsertModal: any;
    displayModal: any;
    displayInsertModal: any;
    marker: any = [];
    newMarker: any = [];
    latNumber: number;
    lngNumber: number;
    newPlaceLat: any;
    newPlaceLng: any;
    locationName: any;
    locationTemp: any;
    id: any;

  constructor(
    public mapsApi: MapsApi,
  ) {
    this.displayModal = 'modal';
    this.displayInsertModal = 'modal';
    this.visible = false;
    this.visibleInsertModal = false;
    this.findMarker();
  }

  ngOnInit() {
  }

  markerClick(marker) {
    alert('test alert');
    console.log(marker);
  }

  placeMarker($event, idUser) {
  console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.newPlaceLat = $event.coords.lat;
    this.newPlaceLng = $event.coords.lng;
    this.id = idUser;
  }

  toggle($event, idUser, locationName) {
    this.findMarker();
    // this.newPlaceLat = $event.coords.lat;
    // this.newPlaceLng = $event.coords.lng;
    this.id = idUser;
    this.locationTemp = locationName;
    console.log(this.visible);
    this.visible = !this.visible;
    console.log(this.visible);
    this.displayModal = this.visible ? 'modal is-active' : 'modal';
  }

  toggleInsert() {
    this.visibleInsertModal = !this.visibleInsertModal;
    console.log(this.visible);
    this.displayInsertModal = this.visibleInsertModal ? 'modal is-active' : 'modal';
  }

  findMarker() {
          console.log('test');
          this.mapsApi.find({
            order: 'feedId DESC'
          }).subscribe(r => {

            this.marker = r;

            for (let i = 0; i < r.length; i++) {
            // this.newMarker.push(r[i]);
            console.log(this.marker);
            console.log(this.marker[i].longitude);
            this.latNumber = Number(this.marker[i].latitude);
            this.lngNumber = Number(this.marker[i].longitude);
            this.marker[i].longitude = this.lngNumber;
            this.marker[i].latitude = this.latNumber;
            console.log(this.latNumber);
            console.log(this.lngNumber);
            console.log(r[i]);
          }
          }
          );

  }

  saveChange() {
        console.log('jalan ke save');
        this.mapsApi.updateAll(
                { userID: this.id },
                {
                  latitude: this.newPlaceLat,
                  longitude: this.newPlaceLng,
                  locationName: this.locationTemp,
                },
              ).subscribe(value => {
                // this.events.publish('post:liked', 'liked');
                console.log('save');
              }, error => console.log(error));
  }

  insertMaps() {
        console.log('jalan ke insert');
        this.item.userID = this.insertUser;
        this.item.latitude = this.insertLatitude;
        this.item.longitude = this.insertLongitude;
        this.item.locationName = this.insertLocation;
        this.mapsApi.create(this.item).subscribe(() =>
            console.log('Save Sukses')
        );
        this.toggleInsert();
  }
}
