import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {CustomerQuery} from './contact-us/query.model';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
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
  viewQuery(): Observable<any> {
    const addurl = 'query';
    const url: string = this.serviceUrl + addurl    ;
    return this.httpClient.get<CustomerQuery[]>(url);
  }
  requestHandled(id): Observable<any> {
    const addurl = 'requesthandled/';
    const url: string = this.serviceUrl + addurl + id   ;
    return this.httpClient.get<CustomerQuery[]>(url);
  }
  hanldedRequest(): Observable<any> {
    const addurl = 'handledrequest';
    const url: string = this.serviceUrl + addurl    ;
    return this.httpClient.get<CustomerQuery[]>(url);
  }
}
