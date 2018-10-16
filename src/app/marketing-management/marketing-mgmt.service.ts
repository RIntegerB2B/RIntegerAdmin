import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Booking} from '../shared/bookings.model';

import {RegistrationBooking} from './registration-setup-booking/registration.model';
import {DigitalMgmtBooking} from './digital-mgmt-booking/digital-mgmt.model';
import {Aplus} from './aplus-cataloging/aplus.model';
import {MarketingServicesBooking} from './marketing-services/marketing-services.model';
import {Notification} from '../shared/notification.model';

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
    return this.httpClient.get<DigitalMgmtBooking[]>(url);
  }

  // aplus booking
  getAplusBooking(): Observable<any> {
    const addurl = 'aplusbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }

  approvedAplusBooking(): Observable<any> {
    const addurl = 'approvedaplusbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  aplusBookingApproval(id) {
    const addurl = 'aplusbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  newAplusBookingCancel(id) {
    const addurl = 'newaplusbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  cancelledAplusBooking(): Observable<any> {
    const addurl = 'cancelledaplusbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  completedAplusBooking(): Observable<any> {
    const addurl = 'completedaplusbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  aplusBookingCancel(id) {
    const addurl = 'aplusbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvalForCancelledAplusBooking(id) {
    const addurl = 'cancelledaplusbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  getAplusBookingDetails(no): Observable<any> {
    const addurl = 'aplusbooking/';
    const viewUrl = '/view';
    const url: string = this.serviceUrl + addurl + no + viewUrl;
    return this.httpClient.get<Aplus[]>(url);
  }

  // cataloging
  getCatalogingBooking(): Observable<any> {
    const addurl = 'catalogbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }
  catalogBookingApproval(id) {
    const addurl = 'catalogbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  approvedCatalogingBooking(): Observable<any> {
    const addurl = 'approvedcatalogbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  newCatalogBookingCancel(id) {
    const addurl = 'newcatalogbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  cancelledCatalogBooking(): Observable<any> {
    const addurl = 'cancelledcatalogbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  catalogBookingCancel(id) {
    const addurl = 'catalogbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvalForCancelledCatalogBooking(id) {
    const addurl = 'cancelledcatalogbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  completedCatalogBooking(): Observable<any> {
    const addurl = 'completedcatalogbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  getCatalogBookingDetails(no): Observable<any> {
    const addurl = 'catalogbooking/';
    const viewUrl = '/view';
    const url: string = this.serviceUrl + addurl + no + viewUrl;
    return this.httpClient.get<Aplus[]>(url);
  }

  // marketing - services booking
  getMarketingBooking(): Observable<any> {
    const addurl = 'marketingbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }

  marketingBookingApproval(id) {
    const addurl = 'marketingbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }

  approvedMarketingBooking(): Observable<any> {
    const addurl = 'approvedmarketingbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  newMarketingBookingCancel(id) {
    const addurl = 'newmarketingbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  cancelledMarketingBooking(): Observable<any> {
    const addurl = 'cancelledmarketingbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  marketingBookingCancel(id) {
    const addurl = 'marketingbooking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  approvalForCancelledMarketingBooking(id) {
    const addurl = 'cancelledmarketingbooking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + id + statusUrl   ;
    return this.httpClient.get<Booking[]>(url);
  }
  getMarketingBookingDetails(no): Observable<any> {
    const addurl = 'marketingbooking/';
    const viewUrl = '/view';
    const url: string = this.serviceUrl + addurl + no + viewUrl;
    return this.httpClient.get<MarketingServicesBooking[]>(url);
  }
  completedMarketingBooking(): Observable<any> {
    const addurl = 'completedmarketingbooking/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<Booking[]>(url);
  }
  pushNotification(data: Notification) {
    const notificationUrl = 'pushnotification';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, data);
  }
}
