import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { Banner } from '../shared/bannerModel.model';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

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


  uploadBannerImage(data): Observable<any> {
    const addUrl = 'banner/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Banner[]>(url, data);
 }
 findBanner(): Observable<any> {
  const addUrl = 'allbannerimage';
  const url: string = this.serviceUrl + addUrl;
  return this.httpClient.get<Banner[]>(url);
}
deleteBanner(deleteData): Observable<any> {
  const addUrl = 'bannerDelete/';
  const url: string = this.serviceUrl + addUrl + deleteData._id;
  return this.httpClient.delete<Banner[]>(url);
}
}
