import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-component';
import { EmailComponent } from './email/email.component';
import { AuthGaurd } from './auth/auth.gaurd';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PayshareComponent } from './payshare/payshare.component';
import { PayhistoryComponent } from './payhistory/payhistory.component';


const routes: Routes = [
  {
    path: 'login', component: AuthComponent
  },
  {
    path: 'emailContent', component: EmailComponent, canActivate: [AuthGaurd]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd]
  },
  {
    path : 'payShare',component : PayshareComponent,canActivate:[AuthGaurd]
  },
  {
    path : 'payHistory',component : PayhistoryComponent,canActivate:[AuthGaurd]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
