import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AllBooking} from './../bookings.model';
import { Observable } from 'rxjs';
import {AppSetting} from './../../config/appSetting';
@Injectable({
  providedIn: 'root'
})
export class AllBookingService {
holder:AllBooking;
serviceUrl:string =AppSetting.serviceUrl;
  constructor(private http:HttpClient) { }

getAllBooking(): Observable <AllBooking[]> {

  const addurl = 'allbooking';
  const url = this.serviceUrl+addurl;
  return this.http.get<AllBooking[]>(url);
}

}
 