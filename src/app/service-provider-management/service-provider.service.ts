import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {SProviders} from '../service-provider-management/approval/serviceProvider.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
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
  findServiceProvider() {
    const addUrl = 'serviceProviders';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<SProviders>(url);
  }
  approved() {
    const addUrl = 'serviceProviderApproved';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<SProviders>(url);
  }
  giveApproval(name , num) {
    const addUrl = 'serviceProvider/';
    const approveUrl = '/Approval/';
    const url: string = this.serviceUrl + addUrl + name + approveUrl + num;
    return this.httpClient.get<SProviders>(url);
  }
}
