import { StatFilter } from './../../../../shared/models/BaseModels';
import { RealTime } from './../../../../shared/services/core/real.time';
import { FireLoopRef } from './../../../../shared/models/FireLoopRef';
import { Todo } from './../../../../shared/models/Todo';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ng2chart-page',
  templateUrl: './ng2chart-page.component.html',
  styleUrls: ['./ng2chart-page.component.scss']
})
export class Ng2chartPageComponent implements OnInit {

  private todo: Todo = new Todo();
  private todoRef: FireLoopRef<Todo>;
  private selectedRange = 'yearly';
  private sub: any;

  // NG2CHARTS Line
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  // NG2CHARTS Bar
  public barChartLabels: Array<any> = [];
  public barChartData: Array<any> = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend: Boolean = true;
  public barChartType: String = 'bar';

  // NG2CHARTS Doughnut
  public doughnutChartLabels: Array<any> = [];
  public doughnutChartData: Array<any> = [];
  public doughnutChartType: String = 'doughnut';
  public doughnutChartOptions: any = {
    responsive: true
  };

  // NG2CHARTS Pie
  public pieChartLabels: Array<any> = [];
  public pieChartData: Array<any> = [];
  public pieChartType: String = 'pie';
  public pieChartOptions: any = {
    responsive: true
  };

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
    this.lineChartLabels = new Array();
    this.barChartLabels = new Array();
    this.doughnutChartLabels = new Array();
    this.pieChartLabels = new Array();

    this.lineChartData = new Array();
    this.barChartData = new Array();
    this.doughnutChartData = new Array();
    this.pieChartData = new Array();

    const data = new Array();
    stats.forEach((stat: any) => {
      // Labels for line, bar, doughnut, and pie
      this.lineChartLabels.push(moment(stat.universal).format('MMM YYYY'));
      this.barChartLabels.push(moment(stat.universal).format('MMM YYYY'));
      this.doughnutChartLabels.push(moment(stat.universal).format('MMM YYYY'));
      this.pieChartLabels.push(moment(stat.universal).format('MMM YYYY'));

      // Data for doughnut and pie
      this.doughnutChartData.push(stat.count);
      this.pieChartData.push(stat.count);
      // Data for line and bar
      data.push(stat.count);
    });
    // Data for line and bar
    this.lineChartData.push({ data: data, label: 'Data Realtime Line Chart' });
    this.barChartData.push({ data: data, label: 'Data Realtime Bar Chart' });
  }


}
