import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Booking} from '../shared/bookings.model';
import {BookingDetail} from './product-booking/product-booking.model';
import {ImageEditing} from './image-editing-booking/editing-booking.model';
import {Creative} from './creative-booking/creative.model';
import {Notification} from '../shared/notification.model';

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


getEditingBookingDetails(no): Observable<any> {
  const addurl = 'editingbooking/';
  const viewUrl = '/view';
  const url: string = this.serviceUrl + addurl + no + viewUrl;
  return this.httpClient.get<ImageEditing[]>(url);
}

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
  const addurl = 'completededitingbooking/';
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

editingBookingCancel(id) {
  const addurl = 'editingbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

approvalForCancelledEditingBooking(id) {
  const addurl = 'cancellededitingbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
 // creative booking

 getCreativeBooking(): Observable<any> {
  const addurl = 'creativebooking/';
  const url: string = this.serviceUrl + addurl;
  return this.httpClient.get<Booking[]>(url);
}

creativeBookingApproval(id) {
  const addurl = 'creativebooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
approvedCreativeBooking(): Observable<any> {
  const addurl = 'approvededcreativebooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);

}
completedCreativeBooking(): Observable<any> {
  const addurl = 'completedcreativebooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);

}
cancelledCreativeBooking(): Observable<any> {
  const addurl = 'cancelledcreativebooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}

newCreativeBookingCancel(id) {
  const addurl = 'newcreativebooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

creativeBookingCancel(id) {
  const addurl = 'creativebooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}


approvalForCancelledCreativeBooking(id) {
  const addurl = 'cancelledcreativebooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}


getCreativeBookingDetails(no): Observable<any> {
  const addurl = 'creativebooking/';
  const viewUrl = '/view';
  const url: string = this.serviceUrl + addurl + no + viewUrl;
  return this.httpClient.get<Creative[]>(url);
}


// scheduled - booking

getScheduledBooking(): Observable<any> {
  const addurl = 'scheduledbooking/';
  const url: string = this.serviceUrl + addurl;
  return this.httpClient.get<Booking[]>(url);
}

approvedScheduledBooking(): Observable<any> {
  const addurl = 'approvedscheduledbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}

cancelledScheduledBooking(): Observable<any> {
  const addurl = 'cancelledscheduledbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}
completedScheduledBooking(): Observable<any> {
  const addurl = 'completedscheduledbooking/';
  const url: string = this.serviceUrl + addurl  ;
  return this.httpClient.get<Booking[]>(url);
}

scheduledBookingApproval(id) {
  const addurl = 'scheduledbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
approvalForCancelledScheduledBooking(id) {
  const addurl = 'cancelledscheduledbooking/';
  const statusUrl = '/approve/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

scheduledBookingCancel(id) {
  const addurl = 'scheduledbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}
cancelNewScheduledBooking(id) {
  const addurl = 'newscheduledbooking/';
  const statusUrl = '/cancel/';
  const url: string = this.serviceUrl + addurl + id + statusUrl   ;
  return this.httpClient.get<Booking[]>(url);
}

getScheduledBookingDetails(no): Observable<any> {
  const addurl = 'scheduledbooking/';
  const viewUrl = '/view';
  const url: string = this.serviceUrl + addurl + no + viewUrl;
  return this.httpClient.get<BookingDetail[]>(url);
}
pushNotification(data: Notification) {
  const notificationUrl = 'pushnotification';
  const url: string = this.serviceUrl + notificationUrl;
  return this.http.post(url, data);
}

}