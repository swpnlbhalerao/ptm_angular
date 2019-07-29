import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(retry(2),
            catchError((error: HttpErrorResponse) => {
                console.log(" Error Object ",error)
                let errorMessage = 'An unknow error occurred';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {

                    switch (error.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMessage = 'This email already exists'
                            break;
                        case 'EMAIL_NOT_FOUND':
                            errorMessage = 'This email doesnt exists'
                            break;
                        case 'INVALID_PASSWORD':
                            errorMessage = 'The password is not valid'
                            break;

                            case 'INVALID_EMAIL':
                                errorMessage = 'The email is invalid'
                                break;
    
                            
                        default:
                            errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;
                    }
                }

                return throwError(errorMessage);
            })
        )
    }

}

