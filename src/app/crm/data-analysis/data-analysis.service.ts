import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from './analysis/subscribed.model';
import { AppSetting } from './../../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient) { }

  onlySubscribed(): Observable<any> {
    const addUrl = 'subscribedcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Notification[]>(url);
  }

  notSubscribed(): Observable<any> {
    const addUrl = 'notsubscribedcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Notification[]>(url);
  }
}
