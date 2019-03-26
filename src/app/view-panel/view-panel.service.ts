import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { BookingDetail } from './../booking-details/view-booking/booking-detail.model';
import { AppSetting } from './../config/appSetting';
import { leadModel } from './new-panel/lead.model';
@Injectable({
  providedIn: 'root'
})
export class ViewPanelService {
  holder;
  lead: leadModel;
  serviceUrl: string = AppSetting.serviceUrl;
  serviceUrlOperation: string = AppSetting.serviceUrlOperation;
  constructor(private http: HttpClient) { }

  getBookingdetails(): Observable<BookingDetail[]> {
    const addurl = 'booking';
    const url: string = this.serviceUrl + addurl;
    return this.http.get<BookingDetail[]>(url);
  }

  getUpdateBookingapprove(book, bookingType: BookingDetail): Observable<BookingDetail> {
    const addurl = 'approve/' + book;
    const url: string = this.serviceUrl + addurl;
    return this.http.put<BookingDetail>(url, bookingType);
  }
  getapprovedtolead(leaddetails): Observable<leadModel> {
    const addurl = 'addlead/';
    const url: string = this.serviceUrlOperation + addurl;
    return this.http.post<leadModel>(url, leaddetails);
  }


  getUpdateBookingcancel(book, bookingType: BookingDetail): Observable<BookingDetail> {
    const addurl = 'cancel/' + book;
    const url: string = this.serviceUrl + addurl;
    return this.http.put<BookingDetail>(url, bookingType);
  }
}
