import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Booking} from '../shared/bookings.model';
import {ITServices} from './it-services-booking/it-services.model';
import {Notification} from '../shared/notification.model';

@Injectable({
  providedIn: 'root'
})
export class ItServicesService {
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

  getITBooking(): Observable<any> {
    const addurl = 'itbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }

 itBookingApproval(id) {
    const addurl = 'itbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvedITBooking(): Observable<any> {
    const addurl = 'approveditbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }

  newITBookingCancel(id) {
    const addurl = 'newitbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  cancelledITBooking(): Observable<any> {
    const addurl = 'cancelledITbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
 itBookinCancel(id) {
    const addurl = 'itbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  approvalForCancelledITBooking(id) {
    const addurl = 'cancelleditbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  completedITBooking(): Observable<any> {
    const addurl = 'completeditbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }

  getITBookingDetails(no): Observable<any> {
    const addurl = 'itbooking/';
    const viewUrl = '/view';
    const url: string = this.serviceUrl + addurl + no + viewUrl;
    return this.httpClient.get<ITServices[]>(url);
  }
  pushNotification(data: Notification) {
    const notificationUrl = 'pushnotification';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, data);
  }
}
