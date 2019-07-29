import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from './dataService';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
 
  private subscriptions:Subscription=new Subscription();
  highcharts = Highcharts;
  chartOptions;
  pieChart = Highcharts;
  pieChartOptions;
  error:String='';
  isloading:boolean=false;

  constructor(private dataService: DataService,private authService :AuthService ) {

  }

  ngOnInit() {
      
      this.chartOptions = this.dataService.getBarChart();
      let user=this.authService.user.getValue().userName;
      let year=2019
     this.subscriptions.add(this.dataService.getPieChart(user,year).subscribe(response=>{
      this.pieChartOptions = response;
      this.isloading=true;
    }, 
    error=>{
     console.log("Dashboard Error",error);
       this.error=error
       this.isloading=true;
    }
     ));
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
