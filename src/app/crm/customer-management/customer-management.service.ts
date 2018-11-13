
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../../shared/customer.model';
import { AppSetting } from './../../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

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
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient) { }
  allCustomer(): Observable<any> {
    const addUrl = 'allcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  duplicateCustomer(): Observable<any> {
    const addUrl = 'duplicatecustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  getAllSubscribeCustomer(): Observable<any> {
    const addUrl = 'subscribecustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  editCustomer(edit): Observable<any> {
    const addUrl = 'customers/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Customer[]>(url, edit);
  }
  addSingleCustomer(data: any): Observable<any> {
    const addUrl = 'singlecustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  }
  deleteCustomer(edit): Observable<any> {

    const addUrl = 'customersdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Customer[]>(url);
  }
}
