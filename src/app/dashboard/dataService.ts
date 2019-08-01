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


  getBarChart(userName: string, year: number) {
    const object = {
      userName: userName,
      year: year
    };
    /*   let array = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      var min = 40;
      var max = 100;
      let data = []
      array.forEach((element, index) => {
        let newArray = [];
        newArray.push(element);
        newArray.push(Math.floor(Math.random() * (+max - +min)) + +min);
        data.push(newArray);
      }); */

    /*  barchartFormat.series[0].data = data;
     return this.barChartOptions = barchartFormat; */
    return this.ptmService.postData('/api/getMonthShareByUser', null, object).pipe(map(response => {
      return this.process(response);
    }));


  }

  getPieChart(userName: string, year: number) {
    const object = {
      userName: userName,
      year: year
    };

    return this.ptmService.postData('/api/getShareByUser', null, object).pipe(map(response => {
      return this.process(response);
    }));
  }

  payShare(userPayObj) {
    return this.ptmService.postData('/api/pay', null, userPayObj);
  }

  getPayHistByUser(userName: string, year: Number) {
    const object = {
      userName: userName,
      year: year
    };
    return this.ptmService.postData('/api/getPayHistByUser', null, object)/* .pipe(map(response => {
      return this.process(response);
    }));; */
  }


  process(responseData: any) {

    if (responseData.type === 'BarChart') {
      barchartFormat.title.text = responseData.data.text;
      barchartFormat.series[0].data = responseData.data.data;
      return this.barChartOptions = barchartFormat;
    } else if (responseData.type === 'PieChart') {
      pieChartFormat.title.text = responseData.data.text;
      pieChartFormat.series[0].data = responseData.data.data;
      //console.log(pieChartFormat);
      return this.pieChartOptions = pieChartFormat;
    }
  }

  getDateParamters(str) {
      var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
     let dateObj = {
      paymentDay: day,
      paymentMonth: mnth,
      paymentYear: date.getFullYear(),
      paymentDate :[date.getFullYear(), mnth, day].join("-")
    }
    return dateObj;
  }

}