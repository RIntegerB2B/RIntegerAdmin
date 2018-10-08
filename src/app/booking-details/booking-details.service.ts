import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import { BookingDetail } from './view-booking/booking-detail.model';
import { Notification} from './update-status/notification.model';
import {EditingStatus} from './update-editing-status/status.model';
import {CreativeStatus} from './update-creative-status/status.model';
import {CatalogingStatus} from './update-cataloging-status/status.model';
import {RegistrationStatus} from './update-registartion-status/status.model';
import {AplusCatalogingStatus} from './update-aplus-status/status.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailsService {
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
 /*  addPushSubscriber(sub: any) {
    const notificationUrl = 'notification';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, sub);
}
 */
  getbookingDetails(): Observable<any> {
    const addurl = 'booking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getModelBookingDetails(): Observable<any> {
    const addurl = 'modelbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getDirectBookingDetails(): Observable<any> {
    const addurl = 'directbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getCatalogBookingDetails(): Observable<any> {
    const addurl = 'catalogbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getRegistrationBookingDetails(): Observable<any> {
    const addurl = 'registrationbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getMarketingBookingDetails(): Observable<any> {
    const addurl = 'marketingbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getEditingBookingDetails(): Observable<any> {
    const addurl = 'editingbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getAplusBookingDetails(): Observable<any> {
    const addurl = 'aplusbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getCreativeBookingDetails(): Observable<any> {
    const addurl = 'creativebooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getCancelBookingDetails(): Observable<any> {
    const addurl = 'cancelbooking/';
    const url: string = this.serviceUrl + addurl;
    return this.httpClient.get<BookingDetail[]>(url);
  }

  getStatusDetail(no): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  getEditingStatus(no): Observable<any> {
    const addurl = 'editingbooking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<EditingStatus>(url);

  }
  getCreativeStatus(no): Observable<any> {
    const addurl = 'creativebooking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<CreativeStatus>(url);

  }
  getCatalogStatus(no): Observable<any> {
    const addurl = 'catalogbooking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<CatalogingStatus>(url);
  }
  getRegistrationStatus(no): Observable<any> {
    const addurl = 'registrationbooking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<RegistrationStatus>(url);
  }
  getAplusStatus(no): Observable<any> {
    const addurl = 'aplusbooking/';
    const statusUrl = '/status';
    const url: string = this.serviceUrl + addurl + no + statusUrl;
    return this.httpClient.get<AplusCatalogingStatus>(url);
  }
  getStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  /* getOrderStatus(no): Observable<any> {
    const addurl = 'order/';
    const url: string = this.serviceUrl + addurl + no ;
    return this.httpClient.get<BookingDetail[]>(url);

  } */
  // process
  progressMaterialStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/progress/';
    const updateUrl = '/material';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  progressShootingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/progress/';
    const updateUrl = '/shootCompleted';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  progressImagedEditingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/progress/';
    const updateUrl = '/imageEditing';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  progressDeliveryStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/progress/';
    const updateUrl = '/delivery';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  progressPaymentStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/progress/';
    const updateUrl = '/payment';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  progressMaterialReturnStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/progress/';
    const updateUrl = '/materialReturn';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  // not completed
  notCompletedMaterialStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/false/';
    const updateUrl = '/material';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  notCompletedShootingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/false/';
    const updateUrl = '/shootCompleted';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  notCompImagedEditingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/false/';
    const updateUrl = '/imageEditing';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  notCompDeliveryStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/false/';
    const updateUrl = '/delivery';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  notCompMaterialReturnStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/false/';
    const updateUrl = '/materialReturn';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  notCompPaymentStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/false/';
    const updateUrl = '/payment';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  // completed
  updateMaterialStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/material';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  updateShootingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/shootCompleted';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);
  }
  imageEditingStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/imageEditing';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  delieveryStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/delivery';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  paymentStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/payment';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  materialReturnStatus(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/status/';
    const updateUrl = '/materialReturn';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl;
    return this.httpClient.get<BookingDetail[]>(url);

  }
  bookingApproval(no, id) {
    const addurl = 'booking/';
    const statusUrl = '/approve/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id ;
    return this.httpClient.get<BookingDetail[]>(url);
  }
  cancelBooking(no, id): Observable<any> {
    const addurl = 'booking/';
    const statusUrl = '/cancel/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id ;
    return this.httpClient.get<BookingDetail[]>(url);
  }
  approvedbooking(): Observable<any> {
    const addurl = 'approved/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<BookingDetail[]>(url);
  }
  cancelledbooking(): Observable<any> {
    const addurl = 'cancelled/';
    const url: string = this.serviceUrl + addurl  ;
    return this.httpClient.get<BookingDetail[]>(url);
  }
  pushNotification(data: Notification) {
    const notificationUrl = 'pushnotification';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, data);
  }

  // not completed image editing status
  imgReceived(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/received/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);

  }

  imgEditing(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/imageediting/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);
  }
  imgDelivery(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/imagedelivery/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);
  }
  payment(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/payment/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);
  }

  // completed image Editing
  completedImgReceived(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/receivedcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);

  }
  completedImgEditing(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/editingcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);

  }
  completedImgDelivery(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/deliverycompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);

  }
  completedImgPayment(no, id, value): Observable<any> {
    const addurl = 'editing/';
    const statusUrl = '/paymentcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<EditingStatus[]>(url);

  }

  // update creative editing

  materialPickedUp(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/materialreceived/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }

  shootPlanning(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/shootplanning/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  shooting(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/shoot/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  postProductionWork(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/postproduction/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  creativePayment(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/payment/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  creativeMaterialReturn(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/materialReturn/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }

  // completed creative booking
  completedMaterialPickedUp(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/materialreceivedcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }

  completedShootPlanning(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/shootplanningcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  completedShooting(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/shootcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  completedPostProductionWork(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/postproductioncompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  completedCreativePayment(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/paymentcompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
completedCreativeMaterialReturn(no, id, value): Observable<any> {
    const addurl = 'creative/';
    const statusUrl = '/materialReturncompleted/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CreativeStatus[]>(url);
  }
  // not completed catalog  status
  imagesRecvd(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/imagereceived/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  productDetails(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/productdetails/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  loginCredentials(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/logincredentials/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  catalogContent(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/catalogcontent/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  catalogUpload(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/catalogupload/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  qcprocessing(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/qcprocessing/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  inventoryupdate(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/inventoryupdate/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  productLive(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/productlive/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  catalogPayment(no, id, value): Observable<any> {
    const addurl = 'catalog/';
    const statusUrl = '/payment/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<CatalogingStatus[]>(url);
  }
  // not completed image editing status
  documentsReq(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/documents/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
return this.httpClient.get<RegistrationStatus[]>(url);
  }
  accountCreation(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/accountcreation/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<RegistrationStatus[]>(url);
  }
  brandRegistration(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/brandregistration/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<RegistrationStatus[]>(url);
  }
  verification(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/verification/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<RegistrationStatus[]>(url);
  }
  activation(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/activation/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<RegistrationStatus[]>(url);
  }
  detailsForward(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/details/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<RegistrationStatus[]>(url);
  }
  registrationPayment(no, id, value): Observable<any> {
    const addurl = 'registration/';
    const statusUrl = '/payment/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<RegistrationStatus[]>(url);
  }
  // update aplus
  aplusMaterialPickUp(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/materialpickup/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusShootPlanning(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/shootplanning/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusShootCompleted(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/shoot/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusPostProduction(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/postproduction/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusProductDetails(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/productdetails/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusLoginCredentials(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/logincredentials/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusCatalogContent(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/content/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusCatalogUpload(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/catalogupload/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusQcProcessing(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/qcprocessing/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusInventory(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/inventory/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusProductLive(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/productlive/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusPayment(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/payment/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
  aplusMaterialReturn(no, id, value): Observable<any> {
    const addurl = 'aplus/';
    const statusUrl = '/materialreturn/';
    const updateUrl = '/value/';
    const url: string = this.serviceUrl + addurl + no + statusUrl + id + updateUrl + value;
    return this.httpClient.get<AplusCatalogingStatus[]>(url);
  }
}
