import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AppSetting } from '../config/appSetting';
import {SuperCategory} from './super-category/super-category.model';
import {MainCategory} from './main-category/main-category.model';
import {MainCategoryDetail} from './main-category/main-category-detail.model';
import {MainCatDetail} from './add-images/category-detail.model';
import {PrimeImageData} from './add-images/mainImageData.model';
import {Category} from './add-images/category.model';
import { MainCatOnSub } from './add-images/main-category.model';
import { DataSource } from '@angular/cdk/table';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OurWorkService {
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

  addCat(data: SuperCategory): Observable<any> {
    const addUrl = 'addCategory/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<SuperCategory>(url, data);
  }


  showCategory(): Observable<any> {
    const addurl = 'categoryDetails/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<SuperCategory[]>(url);
  }

  editCategory(id, edit: SuperCategory): Observable<any> {
    const Caturl = 'category/';
    const url: string = this.serviceUrl + Caturl + id;
    return this.httpClient.put<SuperCategory[]>(url, edit);
  }

  deleteCategory(id, name): Observable<any> {

    const Caturl = 'categoryDelete/';
    const nameUrl = '/name/';

    const url: string = this.serviceUrl + Caturl + id + nameUrl + name;
    return this.httpClient.delete<SuperCategory[]>(url);

  }

  findDetail(): Observable<any> {
    const addurl = 'superCategory/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<SuperCategory[]>(url);
  }


  addMainCategory(data: MainCategory): Observable<any> {
      const addUrl = 'mainCategory/';
      const url: string = this.serviceUrl + addUrl;
      return this.httpClient.post<MainCategory>(url, data);
  }
  deleteMainCategory(id, catID): Observable<any> {
    const Caturl = 'category/';
    const mainurl = '/mainCategory/';
    const url: string = this.serviceUrl + Caturl + id + mainurl + catID;
    return this.httpClient.delete<MainCategoryDetail[]>(url);
  }
  editMainCategory(id, edit: MainCategory): Observable<any> {
    const Caturl = 'category/';
    const mainurl = '/mainCategory/';
    const url: string = this.serviceUrl + Caturl  + id + mainurl + edit._id;
    return this.httpClient.put<MainCategory[]>(url, edit, httpOptions);
  }
  showMainCategoryDetails(superID): Observable<any> {

    const Caturl = 'superCategorydetail/';
    const url: string = this.serviceUrl + Caturl + superID;
    return this.httpClient.get<MainCategory[]>(url);

  }

  showSuperCategoryOnSub(): Observable<any> {
    const addurl = 'mainCategoryData/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<SuperCategory[]>(url);

  }

  showMainCategoryOnSub(id): Observable<any> {
    const Caturl = 'mainCategoryOnSub/';
    const url: string = this.serviceUrl + Caturl + id;
    return this.httpClient.get<MainCatDetail[]>(url);
  }

  uploadprimeImage(primeImageData: PrimeImageData , maincat , subcat, cat ): Observable<any> {
    const formData: FormData = new FormData();
    const maincategory = maincat;
    formData.append('file', primeImageData.primeImage, primeImageData.primeImage.name);
    const addUrl = 'primeimage/';
    const addUrl1 = '/subcat/';
    const addUrl2 = '/cat/';
    const url: string = this.serviceUrl + addUrl + maincategory + addUrl1 + subcat + addUrl2 + cat;
    return this.httpClient.put<boolean>(url, formData);
  }


  addCategory(maincat , subcat, cat,  data: Category): Observable<any> {
  const Caturl = 'maincategory/';
  const mainurl = '/subcategory/';
  const mainurl1 = '/category/';
  const url: string = this.serviceUrl + Caturl  + maincat + mainurl + subcat + mainurl1 + cat ;
  return this.httpClient.put<Category>(url, data);
}


showAllCategory(): Observable<any> {
  const addurl = 'categorydetails/';
  const url: string = this.serviceUrl + addurl;
  return this.httpClient.get<MainCatDetail[]>(url);

}

showMainCategory(superId, mainId): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/details/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2;
  return this.httpClient.get<MainCatOnSub[]>(url);

}

showCategoryDetails(superId, mainId, id): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/category/';
  const addurl3 = '/details/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2 + id + addurl3;
  return this.httpClient.get<MainCatDetail[]>(url);

}

/* '/super/:super/main/:main/cat/:cat/supid/:supid/mainid/:mainid/cat/:catid' */
 createMultipleImages( supercat, maincat, cat , superid, mainid, catid, data ): Observable<any> {
  /*  const formData: FormData = new FormData();
   formData.append('file', imageData.ecommerceImage, imageData.ecommerceImage.name); */
   const addUrl = 'super/';
   const addUrl1 = '/main/';
   const addUrl2 = '/cat/';
   const addUrl3 = '/supid/';
   const addUrl4 = '/mainid/';
   const addUrl5 = '/catid/';
   const url: string = this.serviceUrl + addUrl + supercat +  addUrl1 + maincat + addUrl2 + cat +
    addUrl3 + superid + addUrl4 + mainid + addUrl5 + catid;
   return this.httpClient.put<boolean>(url, data);
 }

 saveMultipleImages( supercat, maincat, cat , data ): Observable<any> {
  /*  const formData: FormData = new FormData();
   formData.append('file', imageData.ecommerceImage, imageData.ecommerceImage.name); */
   const addUrl = 'supercat/';
   const addUrl1 = '/maincat/';
   const addUrl2 = '/category/';
   const addUrl3 = '/imagename/';
   const url: string = this.serviceUrl + addUrl + supercat +  addUrl1 + maincat + addUrl2 + cat + addUrl3 + data;
   return this.httpClient.get<boolean>(url);
 }

 showMultipleImages(superId, mainId, id): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/category/';
  const addurl3 = '/multiimages/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2 + id + addurl3;
  return this.httpClient.get<Category[]>(url);

}
deleteMultipleImages(superId, mainId, id, image): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/category/';
  const addurl3 = '/image/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2 + id + addurl3 + image;
  return this.httpClient.delete<Category[]>(url);

}
/* /supercat/:super/maincat/:main/category/:cat */
removeCategory(superId, mainId, id): Observable<any> {
  const addurl = 'supercat/';
  const addurl1 = '/maincat/';
  const addurl2 = '/category/';
  const url: string = this.serviceUrl + addurl + superId + addurl1 + mainId + addurl2 + id ;
  return this.httpClient.delete<MainCatOnSub[]>(url);

}
updatePrimeImage(primeImageData: PrimeImageData , maincat , subcat, cat , main, sub , name ): Observable<any> {
  const formData: FormData = new FormData();
  const maincategory = maincat;
  formData.append('file', primeImageData.primeImage, primeImageData.primeImage.name);
  const addUrl = 'primeimage/';
  const addUrl1 = '/subcat/';
  const addUrl2 = '/cat/';
  const addUrl3 = '/mainname/';
  const addUrl4 = '/subname/';
  const addUrl5 = '/catname/';
  const url: string = this.serviceUrl + addUrl + maincategory + addUrl1 + subcat + addUrl2 + cat + addUrl3 + main +
   addUrl4 + sub + addUrl5 + name;
  return this.httpClient.put<Category[]>(url, formData);
}
}
