import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpEvent
} from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import {  Router } from "@angular/router";

@Injectable()

export class Authenticationinterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken()
        req = req.clone({
            setHeaders: {
                authorization: String(authToken)
            }
        })
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let response:any = error.error
                if (response.statusCode == 401) {
                    if (response.error === 'Unauthorized') {
                        
                    }
                }

                return throwError(error)
            })
        )
    }
}