import { MapApi } from './../../shared/services/custom/Map';
import { Map } from './../../shared/models/Map';
import { Todo } from './../../shared/models/Todo';
import { StatFilter } from './../../shared/models/BaseModels';
import { RealTime } from './../../shared/services/core/real.time';
import { FireLoopRef } from './../../shared/models/FireLoopRef';

import { Component, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, AgmCoreModule, AgmInfoWindow } from '@agm/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss']
})
export class MapsPageComponent implements OnInit {

    public item: Map = new Map();
    public insertLocation: any;
    public insertLongitude: any;
    public insertLatitude: any;
    public insertUser: any;
    public todoRef: FireLoopRef<Map>;
    // public todos: Map[] = new Array<Map>();
    public todos: any;

    lat: Number = -6.2841462;
    lng: Number = 106.7264780;
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
    longitudeTemp: any;
    latitudeTemp: any;
    idTemp: any;
    userIDTemp: any;
    id: any;
    displaySuccess: any;
    visibleS: any;


  constructor(
    public mapApi: MapApi,
    public router: Router,
    private rt: RealTime
  ) {

    this.rt.onReady().subscribe((status: string) => {
      this.todoRef = this.rt.FireLoop.ref<Map>(Map);
      this.todoRef.on('change').subscribe((todos: any) => {
        console.log(todos, 'isi todos');
        this.todos = todos;
        for (let i = 0; i < todos.length; i++) {
            this.latNumber = Number(todos[i].latitude);
            this.lngNumber = Number(todos[i].longitude);
            this.todos[i].longitude = this.lngNumber;
            this.todos[i].latitude = this.latNumber;
          }
      });
    });

    this.displayModal = 'modal';
    this.displayInsertModal = 'modal';
    this.visible = false;
    this.visibleInsertModal = false;
    this.findMarker();
    this.displaySuccess = 'none';
    this.visibleS = false;
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

  toggle($event, idUser, locationName, longitude, latitude, userID) {
    this.findMarker();
    this.idTemp = idUser;
    this.locationTemp = locationName;
    this.longitudeTemp = longitude;
    this.latitudeTemp = latitude;
    this.userIDTemp = userID;
    console.log(this.visible);
    this.visible = !this.visible;
    console.log(this.visible);
    this.displayModal = this.visible ? 'modal is-active' : 'modal';
  }

  toggleSuccess() {

    this.visibleS = !this.visibleS;
    this.displaySuccess = 'none';
  }

  toggleInsert() {
    this.visibleInsertModal = !this.visibleInsertModal;
    console.log(this.visible);
    this.displayInsertModal = this.visibleInsertModal ? 'modal is-active' : 'modal';
  }

  findMarker() {
          console.log('test');
          this.mapApi.find({
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
        this.mapApi.updateAll(
                { id: this.idTemp },
                {
                  latitude: this.newPlaceLat,
                  longitude: this.newPlaceLng,
                  locationName: this.locationTemp,
                  userID: this.userIDTemp,
                },
              ).subscribe(value => {
              }, error => console.log(error));
              this.visible = !this.visible;
              this.displayModal = this.visible ? 'modal is-active' : 'modal';
              this.visibleS = !this.visibleS;
              this.displaySuccess = this.visibleS ? '' : 'none;';
              setTimeout(() => {
                    this.toggleSuccess();
              }, 3000);
  }

  insertMapsClick($event) {
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        this.item.userid = this.insertUser;
        this.item.latitude = $event.coords.lat;
        this.item.longitude = $event.coords.lng;
        this.item.locationname = this.insertLocation;
        this.mapApi.create(this.item).subscribe(() =>
            console.log('Save Sukses')
        );
        this.visibleS = !this.visibleS;
        this.displaySuccess = this.visibleS ? '' : 'none;';
        setTimeout(() => {
              this.toggleSuccess();
        }, 3000);

  }

  create($event): void {
    console.log('insert maps', $event.coords.lat);
    this.item.latitude = $event.coords.lat;
    this.item.longitude = $event.coords.lng;
    this.todoRef.create(this.item).subscribe(() => this.item = new Map(), err => console.log(err));
    this.visibleS = !this.visibleS;
    this.displaySuccess = this.visibleS ? '' : 'none;';
        setTimeout(() => {
              this.toggleSuccess();
        }, 3000);
  }

  remove($event, todo: Map): void {
    console.log('test');
    // this.todoRef.remove(todo).subscribe();
  }

  insertMaps() {
        console.log('jalan ke insert');
        this.item.userid = this.insertUser;
        this.item.latitude = this.insertLatitude;
        this.item.longitude = this.insertLongitude;
        this.item.locationname = this.insertLocation;
        this.mapApi.create(this.item).subscribe(() =>
            console.log('Save Sukses')
        );
        this.toggleInsert();
        this.visibleS = !this.visibleS;
        this.displaySuccess = this.visibleS ? '' : 'none;';
        setTimeout(() => {
              this.toggleSuccess();
        }, 3000);

  }
}
