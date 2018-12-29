import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { Banner } from '../shared/bannerModel.model';

import {AdImageData} from './ads/adImageData.model';
import {AdsModel} from './ads/ads.model';
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

uploadAdImage(adImageData: AdImageData , position ): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', adImageData.adImage, adImageData.adImage.name);
  const addUrl = 'ads/';
  /* const addUrl1 = '/position/'; */
  const url: string = this.serviceUrl + addUrl  ;
  return this.httpClient.put<boolean>(url, formData);
}

findAdsImage(): Observable<any> {
  const addUrl = 'alladsimage';
  const url: string = this.serviceUrl + addUrl;
  return this.httpClient.get<AdsModel>(url);
}

deleteAds(deleteData): Observable<any> {
  const addUrl = 'adsDelete/';
  const url: string = this.serviceUrl + addUrl + deleteData._id;
  return this.httpClient.delete<AdsModel>(url);
}
}
