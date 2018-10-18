import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {AddMonthlyPlan} from './monthly-plan/monthlyplan.model';
import {DigitalMgmtStatus} from './monthly-plan/digital-mgmt.status.model';
import {WeeklyPlan} from './monthly-plan/weeklyplan.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DigitalManagementService {
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

  addMonth(data: AddMonthlyPlan): Observable<any> {
    const bookurl = 'addmonth/';
    const url: string = this.serviceUrl + bookurl;
    return this.httpClient.post<AddMonthlyPlan>(url, data);
  }

  addMonthlyPlan(data: AddMonthlyPlan): Observable<any> {
    const bookurl = 'addmonthlyplan/';
    const url: string = this.serviceUrl + bookurl;
    return this.httpClient.post<DigitalMgmtStatus>(url, data);
  }
  viewMonthlyPlan(id, month, year) {
    const addurl = 'bookingid/';
    const monthUrl = '/month/';
    const yearUrl = '/year/';
    const  planUrl = '/monthlyplan';
    const url: string = this.serviceUrl + addurl + id + monthUrl + month + yearUrl + year + planUrl  ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
  editMonthlyPlan(id, month, plan: AddMonthlyPlan): Observable<any> {
    const bookingurl = 'id/';
    const monthUrl = '/monthid/';
    const url: string = this.serviceUrl + bookingurl  + id + monthUrl + month ;
    return this.httpClient.put<AddMonthlyPlan>(url, plan, httpOptions);
  }
  deleteMonthlyPlan(id, monthid): Observable<any> {
    const idurl = 'id/';
    const monthUrl = '/monthid/';
    const url: string = this.serviceUrl + idurl + id + monthUrl + monthid;
    return this.httpClient.delete<AddMonthlyPlan[]>(url);

  }
  editMonthlyPlanStatus(id, month, status) {
    const addurl = 'id/';
    const monthUrl = '/month/';
    const statusUrl = '/status/';
    const url: string = this.serviceUrl + addurl + id + monthUrl + month + statusUrl + status  ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
  copyToWeeklyPlan(id, monthid, weekno) {
    const addurl = 'id/';
    const monthUrl = '/monthid/';
    const weekUrl = '/week/';
    const url: string = this.serviceUrl + addurl + id + monthUrl + monthid + weekUrl + weekno  ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }

  // weekly plan
  viewWeeklyPlan(id, month, year, week) {
    const addurl = 'bookingid/';
    const monthUrl = '/month/';
    const yearUrl = '/year/';
    const  weekUrl = '/week/';
    const url: string = this.serviceUrl + addurl + id + monthUrl + month + yearUrl + year + weekUrl + week ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
  addWeeklyPlan(id, month , year,  plan: WeeklyPlan): Observable<any> {
    const bookingurl = 'bookingid/';
    const monthUrl = '/month/';
    const yearUrl = '/year/';
    const  weekUrl = '/addweek/';
    const url: string = this.serviceUrl + bookingurl  + id + monthUrl + month + yearUrl + year + weekUrl ;
    return this.httpClient.put<WeeklyPlan>(url, plan, httpOptions);
  }

  editWeeklyPlan(id, month, plan: WeeklyPlan): Observable<any> {
    const bookingurl = 'id/';
    const monthUrl = '/weekid/';
    const url: string = this.serviceUrl + bookingurl  + id + monthUrl + month ;
    return this.httpClient.put<WeeklyPlan>(url, plan, httpOptions);
  }

  deleteWeeklyPlan(id, monthid): Observable<any> {
    const idurl = 'id/';
    const monthUrl = '/weekid/';
    const url: string = this.serviceUrl + idurl + id + monthUrl + monthid;
    return this.httpClient.delete<WeeklyPlan[]>(url);

  }

  copyDailyPlan(id, monthid, weekno) {
    const addurl = 'id/';
    const monthUrl = '/monthid/';
    const weekUrl = '/week/';
    const url: string = this.serviceUrl + addurl + id + monthUrl + monthid + weekUrl + weekno  ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
/*   /id/:id/week/:weekid/status/:status */
  editWeeklyPlanStatus(id, week, status) {
    const addurl = 'id/';
    const monthUrl = '/week/';
    const statusUrl = '/status/';
    const url: string = this.serviceUrl + addurl + id + monthUrl + week + statusUrl + status  ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
}
