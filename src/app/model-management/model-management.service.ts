import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Model} from './add-model/model.model';
import {PortFolioImageData} from './add-model/portFolioImageData.model';
import {User} from '../account/registration/user.model';
import {UpdateModel} from './add-model/update.model';
import {ImageData} from './image-management/imageData.model';

@Injectable({
  providedIn: 'root'
})
export class ModelManagementService {
  public newSp = new Subject<any>();
  sp: User[] = [];
  imageData: ImageData;
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
  uploadportFolioImage(portFolioImageData: PortFolioImageData , modelname , spName): Observable<any> {
    const formData: FormData = new FormData();
    const modelName = modelname;
    formData.append('file', portFolioImageData.portFolioImage, portFolioImageData.portFolioImage.name);
    const addUrl = 'portFolioImage/';
    const addUrl1 = '/sp/';
    const url: string = this.serviceUrl + addUrl + modelName + addUrl1 + spName;
    return this.httpClient.put<boolean>(url, formData);
  }
  // /ecommerceImage/:id/name/:modelName
  uploadecommerceImage( spName, id, modelName , data ): Observable<any> {
   /*  const formData: FormData = new FormData();
    formData.append('file', imageData.ecommerceImage, imageData.ecommerceImage.name); */
    const addUrl = 'ecommerceImage/';
    const addUrl1 = '/id/';
    const addUrl2 = '/name/';
    const url: string = this.serviceUrl + addUrl + spName +  addUrl1 + id + addUrl2 + modelName ;
    return this.httpClient.put<boolean>(url, data);
  }
  uploadeportraitImage(spName, id, modelName , data ): Observable<any> {
    /* const formData: FormData = new FormData();
    formData.append('file', imageData.portraitImage, imageData.portraitImage.name); */
    const addUrl = 'portraitImage/';
    const addUrl1 = '/id/';
    const addUrl2 = '/name/';
    const url: string = this.serviceUrl + addUrl + spName +  addUrl1 + id + addUrl2 + modelName ;
    return this.httpClient.put<boolean>(url, data);
  }
  uploadeProductImage(spName, id, modelName , data ): Observable<any> {
    /* const formData: FormData = new FormData();
    formData.append('file', imageData.productImage, imageData.productImage.name); */
    const addUrl = 'productImage/';
    const addUrl1 = '/id/';
    const addUrl2 = '/name/';
    const url: string = this.serviceUrl + addUrl + spName +  addUrl1 + id + addUrl2 + modelName ;
    return this.httpClient.put<boolean>(url, data);
  }
  findImages(name , id): Observable<any> {
    const addUrl = 'serviceprovider/';
    const addUrl1 = '/modelimages/';
    const url: string = this.serviceUrl + addUrl + name  + addUrl1 + id;
    return this.httpClient.get<Model>(url);
  }

    serviceProviderModels(id): Observable<any> {
    const addUrl = 'serviceprovider/';
    const modelUrl = '/model';
    const url: string = this.serviceUrl + addUrl + id + modelUrl;
    return this.httpClient.get<Model>(url);
  }
  deleteModel(id): Observable<any> {
    const addUrl = 'model/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.delete<Model>(url);
  }
  updateModel(id, data: UpdateModel): Observable<any> {
    const addurl = 'model/';
    const url: string = this.serviceUrl + addurl + id;
    return this.httpClient.put<Model>(url, data);
  }
  getModelDetails(id): Observable<any> {
    const addUrl = 'model/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.get<Model>(url);
  }
  // sp deletec ecom
  deleteEcomImg(name , id, image): Observable<any> {
    const addUrl = 'serviceprovider/';
    const addUrl1 = '/model/';
    const addUrl2 = '/ecomm/';
    const url: string = this.serviceUrl + addUrl + name + addUrl1 + id + addUrl2 + image ;
    return this.httpClient.delete<Model>(url);
  }
  // sp delete portrait
  deletePortImg(name , id, image): Observable<any> {
    const addUrl = 'serviceprovider/';
    const addUrl1 = '/model/';
    const addUrl2 = '/portrait/';
    const url: string = this.serviceUrl + addUrl + name + addUrl1 + id + addUrl2 + image ;
    return this.httpClient.delete<Model>(url);
  }
  // sp delete product
  deleteProdImg(name , id, image): Observable<any> {
    const addUrl = 'serviceprovider/';
    const addUrl1 = '/model/';
    const addUrl2 = '/product/';
    const url: string = this.serviceUrl + addUrl + name + addUrl1 + id + addUrl2 + image ;
    return this.httpClient.delete<Model>(url);
  }
}
