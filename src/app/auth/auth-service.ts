import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {  BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { PtmService } from '../ptm.service';

export interface AuthResponse {
    email: string,
    kind: string,
    idToken: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    //  user = new Subject<User>();
    user = new BehaviorSubject<User>(null);//return data from previous subrciption
    tokenExpirationTImer: any;
    errorMessage: String = "An unknow error occurred";
    constructor(private ptmService : PtmService, private router: Router) {

    }


    /* signUp(signupDetails) {
        return this.http.post<AuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA2V9BnT6VbfI-vEiOR3aS33LGThHUPy4w',
            {
                email: signupDetails.email,
                password: signupDetails.password,
                returnSecureToken: true
            }).pipe(tap(responseData => {
                this.handleAuthenication(responseData.email, responseData.idToken, responseData.idToken, +responseData.expiresIn);
            }));
    } */

    /* login(loginDetails) {
        console.log(loginDetails);
        console.log(loginDetails.email);
        return this.http.post<AuthResponse>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA2V9BnT6VbfI-vEiOR3aS33LGThHUPy4w',
            {
                email: loginDetails.email,
                password: loginDetails.password,
                returnSecureToken: true
            }
        ).pipe(tap(responseData => {
            this.handleAuthenication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
    } */
    login(loginDetails) {
        console.log(loginDetails);
        console.log(loginDetails.email);
        const object={
            userName : loginDetails.email,
            password : loginDetails.password
        }
        return this.ptmService.postData('/api/user/login',null,object).pipe(tap(responseData => {
        /* console.log("response data",responseData); */
         this.handleAuthenication(responseData.userInfo.email, responseData.userInfo._id, responseData.authtoken, +responseData.expiresIn,responseData.userInfo.userName); 
        }));
    } 



    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData')
        if (this.tokenExpirationTImer) {
            clearTimeout(this.tokenExpirationTImer)
        }
        this.tokenExpirationTImer = null;
    }

    authLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpDate: string,
            userName : string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const userLoaded = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate),userData.userName);
        if (userLoaded.token) {
            this.user.next(userLoaded);
            const expireInTime = new Date(userData._tokenExpDate).getTime() - new Date().getTime();
            this.autoLogout(expireInTime);
        }
    }

    autoLogout(expiresIn: number) {
        console.log(expiresIn);
        this.tokenExpirationTImer = setTimeout(() => {
            this.logout();
        }, expiresIn)

    }

    private handleAuthenication(email: string, userId: string, token: string, expiresIn: number,userName:string) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate,userName);
        this.user.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }
}


