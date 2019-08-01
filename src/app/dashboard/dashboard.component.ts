import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from './dataService';
import { catchError } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';
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

  //loader
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private loadingSubject1= new BehaviorSubject<boolean>(false);
  public loading1$= this.loadingSubject1.asObservable();
  
  constructor(private dataService: DataService,private authService :AuthService ) {

  }

  ngOnInit() {
      
      /* this.chartOptions = this.dataService.getBarChart(); */
      let user=this.authService.user.getValue().userName;
      let year=2019
     
      /*Bar chart fetch*/
      this.subscriptions.add(this.dataService.getBarChart(user,year).subscribe(response=>{
        this.chartOptions = response;
        this.loadingSubject.next(true);
        /* this.isloading=true; */
      }, 
      error=>{
       console.log("Dashboard Error",error);
         this.error=error
         /* this.isloading=true; */
         this.loadingSubject.next(true);
      }
       ));
     
      this.subscriptions.add(this.dataService.getPieChart(user,year).subscribe(response=>{
      this.pieChartOptions = response;
      this.loadingSubject1.next(true);
    }, 
    error=>{
     console.log("Dashboard Error",error);
       this.error=error
       this.loadingSubject1.next(true);
      }
     ));




  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
