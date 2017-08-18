import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss']
})
export class MapsPageComponent implements OnInit {

    title: string = 'My first AGM project';
    lat: number = -6.2841462;
    lng: number = 106.7264780;

  constructor(

  ) { }

  ngOnInit() {
  }

}
