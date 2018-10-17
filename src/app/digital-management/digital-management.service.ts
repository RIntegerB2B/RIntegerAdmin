import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {AddMonthlyPlan} from './monthly-plan/monthlyplan.model';
import {DigitalMgmtStatus} from './monthly-plan/digital-mgmt.status.model';

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
  viewWeeklyPlan(id, month, year, week) {
    const addurl = 'bookingid/';
    const monthUrl = '/month/';
    const yearUrl = '/year/';
    const  weekUrl = '/week/';
    const url: string = this.serviceUrl + addurl + id + monthUrl + month + yearUrl + year + weekUrl + week ;
    return this.httpClient.get<DigitalMgmtStatus>(url);
  }
}
