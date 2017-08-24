import { StatFilter } from './../../../../shared/models/BaseModels';
import { FireLoopRef } from './../../../../shared/models/FireLoopRef';
import { Todo } from './../../../../shared/models/Todo';
import { RealTime } from './../../../../shared/services/core/real.time';
import { Highcharts } from 'highcharts/highcharts.js';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-highcharts-page',
  templateUrl: './highcharts-page.component.html',
  styleUrls: ['./highcharts-page.component.scss']
})
export class HighchartsPageComponent implements OnInit {

  private todo: Todo = new Todo();
  private todoRef: FireLoopRef<Todo>;
  private selectedRange = 'hourly';
  private sub: any;

  optionsLine: Object;
  optionsBar: Object;
  optionsPie: Object;
  optionsDoughnut: Object;

  constructor(private rt: RealTime) {
    this.rt.onReady().subscribe((status: string) => {
      this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
      const st: StatFilter = {
        range: this.selectedRange
      };
      this.todoRef.stats( st ).subscribe((stats: any) => {
        this.loadChart(stats);
      });
    });
  }

  ngOnInit() {
  }

  changeRange(val: string) {
    this.selectedRange = val;
    this.rt.onReady().subscribe((status: string) => {
      this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
      const st: StatFilter = {
        range: this.selectedRange
      };
      this.todoRef.stats( st ).subscribe((stats: any) => {
        this.loadChart(stats);
      });
    });
  }

  loadChart(stats) {
    const dataLine = new Array();
    const dataBar = new Array();
    const dataPie = new Array();
    const dataDoughnut = new Array();

    stats.forEach((stat: any) => {
      dataLine.push(stat.count);
      dataBar.push(stat.count);
      dataPie.push({
        name : moment(stat.universal).format('MMM YYYY'),
        y : stat.count
      });
      dataDoughnut.push({
        name : moment(stat.universal).format('MMM YYYY'),
        y : stat.count
      });
    });

    // Data for line
    this.optionsLine = {
      chart: {
        type: 'line'
      },
      title : { text : 'Todo Data Using Line Chart' },
      series: [{
          name: 'Data Todo',
          data: dataLine,
      }],
      yAxis: {
        title: {
            text: 'Count'
        }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      credits: {
          enabled: false
      },
    };

    // Data for bar
    this.optionsBar = {
      chart: {
        type: 'bar'
      },
      title : { text : 'Todo Data Using Bar Chart' },
      series: [{
        name: 'Data Todo',
        data: dataBar,
      }],
      yAxis: {
        min: 0,
        title: {
            text: 'Data Todo',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
      },
      credits: {
          enabled: false
      },
    };

    // Data for pie
    this.optionsPie = {
      chart: {
        type: 'pie'
      },
      title : { text : 'Todo Data Using Pie Chart' },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
      },
      series: [{
          data: dataPie,
      }],
      credits: {
          enabled: false
      },
    };

    // Data for doughnut
    this.optionsDoughnut = {
      chart: {
        type: 'pie'
      },
      title : { text : 'Todo Data Using Donut Chart' },
      series: [{
          data: dataDoughnut,
          size: '100%',
          innerSize: '50%',
      }],
      plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
          enabled: false
      },
    };
  }

}
