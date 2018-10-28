
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Permission } from './permission/permission/permission.model';
import { Register } from './register/register.model';
@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient, private router: Router
    , private route: ActivatedRoute) {
  }
  permissionUsers(data: Permission) {
    const addUrl = 'permission';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Permission>(url, data);
  }
  registration(data: Register) {
    const addUrl = 'userregister';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Register>(url, data);
  }
  allRegister(): Observable<any> {
    const addUrl = 'allregister';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Register[]>(url);
  }
  permissionRoleType() {
    const addUrl = 'roletypereg';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Permission[]>(url);
  }
}