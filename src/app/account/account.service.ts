import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {ServiceResult} from './sigin/service.model';

import { SignIn } from './sigin/sign.model';
import {ServiceProvider} from './registration/service-provider.model';
import {ServiceProviders} from '../account/sigin/sp.model';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  constructor(private http: Http, private httpClient: HttpClient) { }

  signIn(data: SignIn): Observable<any> {
    const addUrl = 'validate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<SignIn>(url, data);
  }
  registration(data: ServiceProvider) {
    const addUrl = 'serviceProvider';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<SignIn>(url, data);
  }
  validate(data: SignIn) {
    const addUrl = 'serviceProvider/validate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ServiceProviders>(url, data);
  }
}
