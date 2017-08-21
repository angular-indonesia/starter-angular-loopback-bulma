import { Highcharts } from 'highcharts/highcharts.js';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-highcharts-page',
  templateUrl: './highcharts-page.component.html',
  styleUrls: ['./highcharts-page.component.scss']
})
export class HighchartsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('chart') public chartEl: ElementRef;
  
  // private _chart: any;
  
  // private randomValue() {
  //   return Math.floor(Math.random() * 10) + 0;
  // }

  options: Object;
  constructor() {
    this.options = {
      title : { text : 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    // let opts: any = {
    //     xAxis: {
    //       type: 'datetime',
    //       tickPixelInterval: 150
    //     },
    //     series: [{
    //       name: 'Random data',
    //       data: (function () {
    //           var data = [],
    //               time = (new Date()).getTime(),
    //               i;

    //           for (i = -19; i <= 0; i += 1) {
    //               data.push({
    //                   x: time + i * 1000,
    //                   y: Math.floor(Math.random() * 10) + 0
    //               });
    //           }
    //           return data;
    //       }())
    //     }]
    // };
    
    // if (this.chartEl && this.chartEl.nativeElement) {
    //     opts.chart = {
    //         type: 'spline',
    //         renderTo: this.chartEl.nativeElement
    //     };

    //     this._chart = new Highcharts.Chart(opts);
    // }
  }
  
  public ngOnDestroy() {
    // this._chart.destroy();
  }

}
