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
}
