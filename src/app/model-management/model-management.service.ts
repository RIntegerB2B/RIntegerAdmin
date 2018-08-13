import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Model} from './add-model/model.model';
import {PortFolioImageData} from './add-model/portFolioImageData.model';
import {ServiceProvider} from '../account/registration/service-provider.model';

@Injectable({
  providedIn: 'root'
})
export class ModelManagementService {
  public newSp = new Subject<any>();
  sp: ServiceProvider[] = [];
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

  createModel(data: Model): Observable<any> {
    const addUrl = 'model';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Model>(url, data);
  }
/* spDetail(data) {
this.newSp.next(data);
} */
  uploadportFolioImage(portFolioImageData: PortFolioImageData , modelname): Observable<any> {
    const formData: FormData = new FormData();
    const modelName = modelname;
    console.log(name);
    formData.append('file', portFolioImageData.portFolioImage, portFolioImageData.portFolioImage.name);
    const addUrl = 'portFolioImage/';
    const url: string = this.serviceUrl + addUrl + modelName;
    return this.httpClient.put<boolean>(url, formData);
  }
    serviceProviderModels(id): Observable<any> {
    const addUrl = 'serviceprovider/';
    const modelUrl = '/model';
    const url: string = this.serviceUrl + addUrl + id + modelUrl;
    return this.httpClient.get<Model>(url);
  }
}
