import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Customers} from './customer-details/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
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

  findCustomers(): Observable<any> {
    const addurl = 'customers/';
    const url: string = this.serviceUrl + addurl ;
    return this.httpClient.get<Customers[]>(url);

  }
  findShootType(id): Observable<any> {
    const addurl = 'shootType/';
    const url: string = this.serviceUrl + addurl + id;
    return this.httpClient.get<Customers[]>(url);

  }
  findModelType(id , id2): Observable<any> {
    const addurl = 'modelType/';
    const shooturl = '/shootType/';
    const url: string = this.serviceUrl + addurl + id2 + shooturl + id;
    return this.httpClient.get<Customers[]>(url);
  }
  findProductType(product): Observable<any> {
    const addurl = 'productType/';
    const url: string = this.serviceUrl + addurl + product ;
    return this.httpClient.get<Customers[]>(url);
  }
}
