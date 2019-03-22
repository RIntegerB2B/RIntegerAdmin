import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        /* const tokenKey = JSON.parse(sessionStorage.getItem('tokenKey')); */
        const tokenKey = sessionStorage.getItem('tokenKey');
        if (tokenKey) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${tokenKey}`
                }
            });
        }
        return next.handle(request);
    }
}