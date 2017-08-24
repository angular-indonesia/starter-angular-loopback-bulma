import { StatFilter } from './../../../../shared/models/BaseModels';
import { RealTime } from './../../../../shared/services/core/real.time';
import { FireLoopRef } from './../../../../shared/models/FireLoopRef';
import { Todo } from './../../../../shared/models/Todo';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-google-chart-page',
  templateUrl: './google-chart-page.component.html',
  styleUrls: ['./google-chart-page.component.scss']
})
export class GoogleChartPageComponent implements OnInit {

  private todo: Todo = new Todo();
  private todoRef: FireLoopRef<Todo>;
  private selectedRange = 'hourly';
  private sub: any;

  private lineChartData;
  private barChartData;
  private pieChartData;
  private doughnutChartData;

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
    this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
    const st: StatFilter = {
      range: this.selectedRange
    };
    this.todoRef.stats( st ).subscribe((stats: any) => {
      this.loadChart(stats);
    });
  }

  loadChart(stats) {
    const dataChart = new Array();
    dataChart.push(['Label', 'Count']);

    stats.forEach((stat: any) => {
      // Data for line, bar, pie, doughnut
      dataChart.push([moment(stat.universal).format('MMM YYYY'), stat.count]);
    });

    // Setting for line chart
    this.lineChartData =  {
      chartType: 'LineChart',
      dataTable: dataChart,
      options: {
        title: 'Line Chart'
      }
    };

    // Setting for bar chart
    this.barChartData =  {
      chartType: 'BarChart',
      dataTable: dataChart,
      options: {
        title: 'Bar Chart'
      }
    };

    // Setting for pie chart
    this.pieChartData =  {
      chartType: 'PieChart',
      dataTable: dataChart,
      options: {
        title: 'Pie Chart'
      }
    };

    // Setting for doughnut using pie chart
    this.doughnutChartData =  {
      chartType: 'PieChart',
      dataTable: dataChart,
      options: {
        title: 'Doughnut Chart',
        pieHole: 0.3,
      }
    };
  }

}
