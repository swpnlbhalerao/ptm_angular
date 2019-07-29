import { Injectable, ɵConsole } from '@angular/core';
import * as Highcharts from 'highcharts';
import { barchartFormat, pieChartFormat } from './highChartFormats';
import { PtmService } from '../ptm.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class DataService {
  barChartOptions: any;
  pieChartOptions: any;

  constructor(private ptmService: PtmService) {

  }


  getBarChart() {

    let array = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    var min = 40;
    var max = 100;
    let data = []
    array.forEach((element, index) => {
      let newArray = [];
      newArray.push(element);
      newArray.push(Math.floor(Math.random() * (+max - +min)) + +min);
      data.push(newArray);
    });

    barchartFormat.series[0].data = data;
    return this.barChartOptions = barchartFormat;
  }

  getPieChart(userName: string, year : number) {
    const object = {
      userName: userName,
      year : year
    };

    return this.ptmService.postData('/api/getShareByUser',null, object).pipe(map(response=>{
      return this.process(response);
    }));
    

  }


  process(responseData: any) {
    pieChartFormat.title.text = responseData.data.text;
    pieChartFormat.series[0].data = responseData.data.data;
    console.log(pieChartFormat);
    return this.pieChartOptions = pieChartFormat;
  }

}