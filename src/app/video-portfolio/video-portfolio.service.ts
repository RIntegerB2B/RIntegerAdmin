import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AppSetting } from '../config/appSetting';
import {VideoSuperCategory} from './super-category-video/video-super-category.model';
import {VideoMainCategory} from './main-category-video/main-category-video.model';
import {VideoMainCategoryDetail} from './main-category-video/main-category-video-detail.model';
import {VideoCategory} from './add-videos/video-portfolio.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VideoPortfolioService {
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
  constructor(private http: Http, private httpClient: HttpClient) { }

  showCategory(): Observable<any> {
    const addurl = 'videoCategoryDetails/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<VideoSuperCategory[]>(url);
  }

  addCat(data: VideoSuperCategory): Observable<any> {
    const addUrl = 'addVideoCategory/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<VideoSuperCategory>(url, data);
  }

  editCategory(id, edit: VideoSuperCategory): Observable<any> {
    const Caturl = 'videocategory/';
    const url: string = this.serviceUrl + Caturl + id;
    return this.httpClient.put<VideoSuperCategory[]>(url, edit);
  }

  deleteCategory(id, name): Observable<any> {

    const Caturl = 'videoCategoryDelete/';
    const nameUrl = '/name/';

    const url: string = this.serviceUrl + Caturl + id + nameUrl + name;
    return this.httpClient.delete<VideoSuperCategory[]>(url);

  }

  findDetail(): Observable<any> {
    const addurl = 'videoSuperCategory/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<VideoSuperCategory[]>(url);
  }
  showMainCategoryDetails(superID): Observable<any> {

    const Caturl = 'videoSuperCategorydetail/';
    const url: string = this.serviceUrl + Caturl + superID;
    return this.httpClient.get<VideoMainCategory[]>(url);

  }
  addMainCategory(data: VideoMainCategory): Observable<any> {
    const addUrl = 'videomainCategory/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<VideoMainCategory>(url, data);
}
deleteMainCategory(id, catID): Observable<any> {
  const Caturl = 'category/';
  const mainurl = '/videomainCategory/';
  const url: string = this.serviceUrl + Caturl + id + mainurl + catID;
  return this.httpClient.delete<VideoMainCategoryDetail[]>(url);
}
editMainCategory(id, edit: VideoMainCategory): Observable<any> {
  const Caturl = 'category/';
  const mainurl = '/videomainCategory/';
  const url: string = this.serviceUrl + Caturl  + id + mainurl + edit._id;
  return this.httpClient.put<VideoMainCategory[]>(url, edit, httpOptions);
}

showSuperCategoryOnSub(): Observable<any> {
  const addurl = 'videoMainCategoryData/';
  const url: string = this.serviceUrl + addurl;
  return this.httpClient.get<VideoSuperCategory[]>(url);

}

showMainCategoryOnSub(id): Observable<any> {
  const Caturl = 'videoMainCategoryOnSub/';
  const url: string = this.serviceUrl + Caturl + id;
  return this.httpClient.get<VideoMainCategoryDetail[]>(url);
}

addCategory(maincat , subcat, cat,  data: VideoCategory): Observable<any> {
  const Caturl = 'maincategory/';
  const mainurl = '/subcategory/';
  const mainurl1 = '/videocategory/';
  const url: string = this.serviceUrl + Caturl  + maincat + mainurl + subcat + mainurl1 + cat ;
  return this.httpClient.put<VideoCategory>(url, data);
}

showMainCategory(superId, mainId): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/videodetails/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2;
  return this.httpClient.get<VideoMainCategory>(url);

}
removeCategory(superId, mainId, id): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/videocategory/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2 + id ;
  return this.httpClient.delete<VideoMainCategory[]>(url);

}
}
