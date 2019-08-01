import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../dashboard/dataService';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-payhistory',
  templateUrl: './payhistory.component.html',
  styleUrls: ['./payhistory.component.scss']
})
export class PayhistoryComponent implements OnInit,OnDestroy {
 openId=0;
 toggle=false;
  error=''
  payData:any;
  private subscriptions: Subscription = new Subscription();

  constructor(private dataService:DataService,private authService:AuthService) { }

  ngOnInit() {
    let user=this.authService.user.getValue().userName;
    let year=2019
    this.subscriptions.add(this.dataService.getPayHistByUser(user,year).subscribe(
      (response) => {
        console.log(response);
        this.payData = response.data;
      },
      (err) => this.error = err
    ));
  
  }

  showMore(value){
    console.log(value);
    this.toggle=!this.toggle;
  this.openId=value;
  }

  ngOnDestroy(): void {
    // cancel all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
  }

}
