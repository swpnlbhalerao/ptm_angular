import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from './dataService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  highcharts = Highcharts;
  chartOptions;
  pieChart = Highcharts;
  pieChartOptions;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.chartOptions = this.dataService.getBarChart();
    this.chartOptions.title.text = 'Hello World ';
    this.pieChartOptions = this.dataService.getPieChart();
  }

}
