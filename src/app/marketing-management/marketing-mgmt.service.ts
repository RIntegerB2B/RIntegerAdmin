import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Booking} from '../shared/bookings.model';

import {RegistrationBooking} from './registration-setup-booking/registration.model';

@Injectable({
  providedIn: 'root'
})
export class MarketingMgmtService {
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
  getRegistrationBooking(): Observable<any> {
    const addurl = 'registrationbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }
  registrationBookingApproval(id) {
    const addurl = 'registrationbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvedRegistrationBooking(): Observable<any> {
    const addurl = 'approvedregistrationbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  completedRegistrationBooking(): Observable<any> {
    const addurl = 'completedRegistrationBooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  cancelledRegistrationBooking(): Observable<any> {
    const addurl = 'cancelledRegistrationBooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  newRegistrationBookingCancel(id) {
    const addurl = 'newregistrationbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  registrationBookingCancel(id) {
    const addurl = 'registrationbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvalForCancelledRegistrationBooking(id) {
    const addurl = 'cancelledregistrationbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  getRegistrationBookingDetails(no): Observable<any> {
    const addurl = 'registrationbooking/';
    const viewUrl = '/view';
    const url: string = this.serviceUrl + addurl + no + viewUrl;
    return this.httpClient.get<RegistrationBooking[]>(url);
  }

  // registration

  getDigitalMarketingBooking(): Observable<any> {
    const addurl = 'digitalmarketingbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }

 digitalMarketingBookingApproval(id) {
    const addurl = 'digitalmarketingbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvedDigitalMarketingBooking(): Observable<any> {
    const addurl = 'approveddigitalmarketingbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }

  newDigitalMarketingBookingCancel(id) {
    const addurl = 'newdigitalmarketingbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  cancelledDigitalMarketingBooking(): Observable<any> {
    const addurl = 'cancelleddigitalmarketingbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  digitalMarketingBookinCancel(id) {
    const addurl = 'digitalmarketingbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  approvalForCancelledDigitalMarketingBooking(id) {
    const addurl = 'cancelleddigitalmarketingbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  completedDigitalMarketingBooking(): Observable<any> {
    const addurl = 'completeddigitalmarketingbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }

  getDigitalMarketingBookingDetails(no): Observable<any> {
    const addurl = 'digitalmarketingbooking/';
    const viewUrl = '/view';
    const url: string = this.serviceUrl + addurl + no + viewUrl;
    return this.httpClient.get<RegistrationBooking[]>(url);
  }
}
