import { Injectable, ɵConsole } from '@angular/core';
import * as Highcharts from 'highcharts';
import { barchartFormat, pieChartFormat } from './highChartFormats';

@Injectable({providedIn:"root"})
export class DataService{
barChartOptions : any;
pieChartOptions :any;

constructor(){

}


getBarChart(){

    let array =['Jan','Feb','Mar','Apr','May'];
    var min=40; 
    var max=100;  
    let data=[]
    array.forEach((element,index) => {
        let newArray=[];
        newArray.push(element);
        newArray.push(Math.floor(Math.random() * (+max - +min)) + +min);
        data.push(newArray);
    });

        barchartFormat.series[0].data=data;
 return this.barChartOptions=barchartFormat;
}

getPieChart(){
      pieChartFormat.title.text ='Share Percentage'; 
        let data=[];
        let me=[];
        let others=[];
        me.push('swpnlb')
        me.push(20)

        others.push('others')
        others.push(80)
 
        data.push(me);
        data.push(others);
        
        console.log(data);
      
      pieChartFormat.series[0].data=data; 
      return this.pieChartOptions=pieChartFormat;
}





}