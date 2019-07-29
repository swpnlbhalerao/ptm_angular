import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import {Subscription } from 'rxjs';


import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls :['./header.component.scss']
 
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    userInfo:any ;
    userAuthSubscription: Subscription;
    //  firstObservable:Subscription;

    constructor(private authService: AuthService,private router:Router) {

    }

    ngOnInit(): void {
       console.log("Header ngonit");
        this.userAuthSubscription = this.authService.user.subscribe(
            user => {
                console.log("header component userinfo data" +user); 
                this.isAuthenticated = !!user;
                this.userInfo=user;
            }

            
        )


    }


   
    logout(){
        this.authService.logout();
        this.router.navigateByUrl('/login')
    }


    ngOnDestroy() {
        this.userAuthSubscription.unsubscribe();
    }




}
