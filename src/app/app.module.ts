import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartComponent } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth-component';
import { AlertComponent } from './alert/alert-component';
import { interceptProviders } from './interceptors';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailComponent } from './email/email.component';
import { LoaderComponent } from './loader/loader.component';
import { PayshareComponent } from './payshare/payshare.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayhistoryComponent } from './payhistory/payhistory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighchartsChartComponent,
    AuthComponent,
    AlertComponent,
    EmailComponent,
    DashboardComponent,
    AuthComponent,
    EmailComponent,
    LoaderComponent,
    PayshareComponent,
    PayhistoryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [interceptProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
