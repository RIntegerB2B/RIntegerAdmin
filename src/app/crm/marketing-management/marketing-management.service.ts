import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Market } from '../../shared/marketing.model';
import { AppSetting } from './../../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MarketingManagementService {
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
  allMarketCustomer(): Observable<any> {
    const addUrl = 'allmarketcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Market[]>(url);
  }
  duplicateMarketCustomer(): Observable<any> {
    const addUrl = 'duplicatemarketcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Market[]>(url);
  }
  editMarketCustomer(edit): Observable<any> {
    const addUrl = 'marketcustomers/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Market[]>(url, edit);
  }
  addSingleMarketCustomer(data: any): Observable<any> {
    const addUrl = 'singlemarketcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Market[]>(url, data);
  }
  deleteMarketCustomer(edit): Observable<any> {
    const addUrl = 'marketcustomersdelete/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Market[]>(url);
  }
}
