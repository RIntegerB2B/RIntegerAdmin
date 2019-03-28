import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AllBooking } from './../bookings.model';
import { AppSetting } from './../../config/appSetting';
import { BookingDetail } from './../../booking-details/view-booking/booking-detail.model';
@Injectable({
  providedIn: 'root'
})
export class CancelledbookingService {
  holder: AllBooking;
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }


  getCancelledBooking(): Observable<AllBooking[]> {
    const addurl = 'allCancelled';
    const url = this.serviceUrl + addurl;

    return this.http.get<AllBooking[]>(url);

  }

  getUpdateBookingapprove(book, bookingType: AllBooking): Observable<AllBooking> {
    const addurl = 'approve/' + book;
    const url: string = this.serviceUrl + addurl;
    return this.http.put<AllBooking>(url, bookingType);
  }

}
