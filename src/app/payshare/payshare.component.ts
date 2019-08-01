import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../dashboard/dataService';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth-service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-payshare',
  templateUrl: './payshare.component.html',
  styleUrls: ['./payshare.component.scss']
})
export class PayshareComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  disableCancel: boolean = false;
  error: string;
  disableBtns: boolean = false;
  resetBtn: boolean = false;
  response;

  private subscriptions: Subscription = new Subscription();
  constructor(private dataService: DataService, private authService: AuthService) {
    this.minDate.setDate(this.minDate.getDate() - 10);

    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', dateInputFormat: 'YYYY-MM-DD' })
  }

  ngOnInit() {
  }

  onSubmit(payForm: NgForm) {
    console.log(payForm);
    if (!payForm.valid) {
      return;
    }

    this.disableCancel = true;
    this.disableBtns = true;
    this.error = ''
    let dateParams = this.getDateParamters(payForm.value.payDate);


    let payObj = {
      userName: this.authService.user.getValue().userName,
      amount: payForm.value.amount,
      paymentDate: dateParams.paymentDate,
      paymentDay: parseInt(dateParams.paymentDay),
      paymentMonth: parseInt(dateParams.paymentMonth),
      paymentYear: dateParams.paymentYear
    }

    //console.log(payObj);
      this.subscriptions.add(this.dataService.payShare(payObj).subscribe(
            (response) => {
              console.log(response);
              this.response = response.message
            },
            (err) => this.error = err
          ));
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



  resetForm(payForm: NgForm) {
    this.error = ''
    this.response = '';
    payForm.resetForm();
  }

  ngOnDestroy(): void {
    // cancel all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
  }
}
