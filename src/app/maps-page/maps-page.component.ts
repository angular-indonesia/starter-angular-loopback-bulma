import { Todo } from './../../shared/models/Todo';
import { StatFilter } from './../../shared/models/BaseModels';
import { RealTime } from './../../shared/services/core/real.time';
import { FireLoopRef } from './../../shared/models/FireLoopRef';
import { Map } from './../../shared/models/Map';
import { MapApi } from './../../shared/services/custom/Map';
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

    title: String = 'My first AGM project';
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
    userIDTemp: any;
    id: any;
    displaySuccess: any;
    visibleS: any;


  constructor(
    public mapsApi: MapApi,
    public router: Router,
    private rt: RealTime
  ) {

    this.rt.onReady().subscribe((status: string) => {
      this.todoRef = this.rt.FireLoop.ref<Map>(Map);
      // console.log(this.todoRef, 'isi ref');
      // const st: StatFilter = {
      //   range: this.selectedRange
      // };
      // this.todoRef.stats( ).subscribe((stats: any) => {
      //   // this.loadChart(stats);
      //   console.log(stats);
      // });

      this.todoRef.on('change').subscribe((todos: any) => {
        // this.todos = todos;
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
    // this.newPlaceLat = $event.coords.lat;
    // this.newPlaceLng = $event.coords.lng;
    this.id = idUser;
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
          this.mapsApi.find({
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

  insertMapsClick($event) {
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        // this.item.userID = this.insertUser;
        // this.item.latitude = $event.coords.lat;
        // this.item.longitude = $event.coords.lng;
        // this.item.locationName = this.insertLocation;
        // this.mapsApi.create(this.item).subscribe(() =>
        //     console.log('Save Sukses')
        // );
        this.visibleS = !this.visibleS;
        this.displaySuccess = this.visibleS ? '' : 'none;';
        setTimeout(() => {
              this.toggleSuccess();
              location.reload();
//              this.router.navigate(['/home/blog']);
        }, 3000);

  }

  create($event): void {
    console.log('insert maps', $event.coords.lat);
    this.item.latitude = $event.coords.lat;
    this.item.longitude = $event.coords.lng;
    this.todoRef.create(this.item).subscribe(() => this.item = new Map(), err => console.log(err));
  }

  remove($event, todo: Map): void {
    console.log('test');
    // this.todoRef.remove(todo).subscribe();
  }

  insertMaps() {
        console.log('jalan ke insert');
        // this.item.userID = this.insertUser;
        // this.item.latitude = this.insertLatitude;
        // this.item.longitude = this.insertLongitude;
        // this.item.locationName = this.insertLocation;
        this.mapsApi.create(this.item).subscribe(() =>
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
