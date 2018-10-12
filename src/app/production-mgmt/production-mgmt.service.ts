import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Booking} from '../shared/bookings.model';
import {BookingDetail} from './product-booking/product-booking.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionMgmtService {
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

  getProductBooking(): Observable<any> {
    const addurl = 'directbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<Booking[]>(url);
  }

getProductBookingDetails(no): Observable<any> {
  const addurl = 'productbooking/';
  const viewUrl = '/view';
  const url: string = this.serviceUrl + addurl + no + viewUrl;
  return this.httpClient.get<BookingDetail[]>(url);
}
approvedProductBooking(): Observable<any> {
  const addurl = 'approvedproductbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
cancelledProductBooking(): Observable<any> {
  const addurl = 'cancelledproductbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
completedProductBooking(): Observable<any> {
  const addurl = 'completedproductbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
bookingApproval(id) {
  const addurl = 'booking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
bookingApprovalForCancelledBooking(id) {
  const addurl = 'cancelledbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
bookingCancel(id) {
  const addurl = 'booking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
cancelNewBooking(id) {
  const addurl = 'newproductbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

// model booking

getModelBooking(): Observable<any> {
  const addurl = 'modelbooking/';
  const url: string = this.serviceUrl + addurl;
  return this.httpClient.get<Booking[]>(url);
}

approvedModelBooking(): Observable<any> {
  const addurl = 'approvedmodelbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
modelBookingApproval(id) {
  const addurl = 'modelbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

cancelNewModelBooking(id) {
  const addurl = 'newmodelbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
cancelledModelBooking(): Observable<any> {
  const addurl = 'cancelledmodelbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}

modelBookingCancel(id) {
  const addurl = 'modelbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

approvalForCancelledModelBooking(id) {
  const addurl = 'cancelledmodelbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

completedmodelbooking(): Observable<any> {
  const addurl = 'completedmodelbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
getModelBookingDetails(no): Observable<any> {
  const addurl = 'modelbooking/';
  const viewUrl = '/view';
  const url: string = this.serviceUrl + addurl + no + viewUrl;
  return this.httpClient.get<BookingDetail[]>(url);
}

// editing booking

getEditingBooking(): Observable<any> {
  const addurl = 'editingbooking/';
  const url: string = this.serviceUrl + addurl;
  return this.httpClient.get<Booking[]>(url);
}
approvedEditingBooking(): Observable<any> {
  const addurl = 'approvededitingbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
cancelledEditingBooking(): Observable<any> {
  const addurl = 'cancellededitingbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}

completedEditingBooking(): Observable<any> {
  const addurl = 'completedproductbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}

editingBookingApproval(id) {
  const addurl = 'editingbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

newEditingBookingCancel(id) {
  const addurl = 'neweditingbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
}
