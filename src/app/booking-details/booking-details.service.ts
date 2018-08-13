import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import { BookingDetail } from './view-booking/booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailsService {
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
 /*  addPushSubscriber(sub: any) {
    const notificationUrl = 'notification';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, sub);
}
 */
  getbookingDetails(): Observable<any> {
    const addurl = 'booking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }

  getStatusDetail(no): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  /* getOrderStatus(no): Observable<any> {
    const addurl = 'order/';
    const url: string = this.serviceUrl + addurl + no ;
    return this.httpClient.get<BookingDetail[]>(url);

  } */
  updateMaterialStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/material';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  updateShootingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/shootCompleted';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  imageEditingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/imageEditing';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  delieveryStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/delivery';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  paymentStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/payment';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  materialReturnStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/materialReturn';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
}
