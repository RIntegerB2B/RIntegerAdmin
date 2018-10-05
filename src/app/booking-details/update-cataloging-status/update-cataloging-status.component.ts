import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { CatalogingStatus } from './status.model';
import { Notification } from './notification.model';

@Component({
  selector: 'app-update-cataloging-status',
  templateUrl: './update-cataloging-status.component.html',
  styleUrls: ['./update-cataloging-status.component.css']
})
export class UpdateCatalogingStatusComponent implements OnInit {

  no;
  value;
  Status: CatalogingStatus;
  updateCatalogStatusForm: FormGroup;
  displayStatus: Boolean;
  progress: boolean;
  completed: boolean;
  imagesRec: boolean;
  imagesRecTrue: boolean;
  imagesRecProgress: boolean;
  productDetail: boolean;
  productDetailTrue: boolean;
  productDetailProgress: boolean;
  loginCredentials: boolean;
  loginCredentialsTrue: boolean;
  loginCredentialsProgress: boolean;
  catalogContent: boolean;
  catalogContentTrue: boolean;
  catalogContentProgress: boolean;
  catalogUpload: boolean;
  catalogUploadTrue: boolean;
  catalogUploadProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
  qc_processing: boolean;
  qc_processingTrue: boolean;
  qc_processingProgress: boolean;
  inventoryUpdate: boolean;
  inventoryUpdateTrue: boolean;
  inventoryUpdateProgress: boolean;
  productOnLive: boolean;
  productOnLiveTrue: boolean;
  productOnLiveProgress: boolean;
  updateGridView: boolean;
  notificationModel: Notification;
  title: string;
  notificationBody: string;
  titleToSent: string;
  confirmed: boolean;
  cancelled: boolean;
  hide: boolean;
  orderconfirmed: boolean;
  readonly VAPID_PUBLIC_KEY = 'BIvwBoUek8ZLiE2HRr_srixb0Qi-Ql6CVBhhhvIuuZ5PMFYrfP0zSkNRrHD-uvIBhJ3_BDmzSFedMzu5ZuaVVRM';
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private bookingService: BookingDetailsService,
    private swUpdate: SwUpdate, private swPush: SwPush) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
  }

  ngOnInit() {
    this.createForm();
    this.getStatus(this.no);
  }
  createForm() {
    this.updateCatalogStatusForm = this.fb.group({
      mobileNo: [''],
      id: ['']
    });
  }
  getStatus(id) {
    this.bookingService.getCatalogStatus(id).subscribe(data => {
      this.Status = data;
      console.log(data[0]);
      switch (data[0].imageReceived) {
        case 0: {
          this.imagesRec = true;
          this.imagesRecTrue = false;
          this.imagesRecProgress = false;
          break;
        }
        case 1: {
          this.imagesRec = false;
          this.imagesRecTrue = true;
          this.imagesRecProgress = false;
          break;
        }
        case 2: {
          this.imagesRec = false;
          this.imagesRecTrue = false;
          this.imagesRecProgress = true;
          break;
        }
      }
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailProgress = false;
          this.productDetailTrue = true;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailProgress = true;
          this.productDetailTrue = false;
          break;
        }
      }
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredentials = true;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = false;
          break;
        }
        case 1: {
          this.loginCredentialsTrue = true;
          this.loginCredentials = false;
          this.loginCredentialsProgress = false;
          break;
        }
        case 2: {
          this.loginCredentialsTrue = false;
          this.loginCredentials = false;
          this.loginCredentialsProgress = true;
          break;
        }
      }
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogContent = true;
          this.catalogContentTrue = false;
          this.catalogContentProgress = false;
          break;
        }
        case 1: {
          this.catalogContent = false;
          this.catalogContentTrue = true;
          this.catalogContentProgress = false;
          break;
        }
        case 2: {
          this.catalogContent = false;
          this.catalogContentTrue = false;
          this.catalogContentProgress = true;
          break;
        }
      }
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
      switch (data[0].qc_processing) {
        case 0: {
          this.qc_processing = true;
          this.qc_processingTrue = false;
          this.qc_processingProgress = false;
          break;
        }
        case 1: {
          this.qc_processing = false;
          this.qc_processingProgress = false;
          this.qc_processingTrue = true;
          break;
        }
        case 2: {
          this.qc_processing = false;
          this.qc_processingProgress = true;
          this.qc_processingTrue = false;
          break;
        }
      }
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = true;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveTrue = true;
          this.productOnLiveProgress = false;
          break;
        }
      }
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdate = true;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = false;
          break;
        }
        case 1: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = true;
          break;
        }
        case 2: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = true;
          this.inventoryUpdateProgress = false;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentProgress = false;
          this.paymentTrue = true;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentProgress = true;
          this.paymentTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompImgRecvd(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.imagesRecvd(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].imageReceived) {
        case 0: {
          this.imagesRec = true;
          this.imagesRecTrue = false;
          this.imagesRecProgress = false;
          break;
        }
        case 1: {
          this.imagesRec = false;
          this.imagesRecTrue = true;
          this.imagesRecProgress = false;
          break;
        }
        case 2: {
          this.imagesRec = false;
          this.imagesRecTrue = false;
          this.imagesRecProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressImgRecvd(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.imagesRecvd(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].imageReceived) {
        case 0: {
          this.imagesRec = true;
          this.imagesRecTrue = false;
          this.imagesRecProgress = false;
          break;
        }
        case 1: {
          this.imagesRec = false;
          this.imagesRecTrue = true;
          this.imagesRecProgress = false;
          break;
        }
        case 2: {
          this.imagesRec = false;
          this.imagesRecTrue = false;
          this.imagesRecProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
 notCompProductDetails(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.productDetails(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailTrue = true;
          this.productDetailProgress = false;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailTrue = false;
          this.productDetailProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
   progressProductDetails(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.productDetails(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailTrue = true;
          this.productDetailProgress = false;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailTrue = false;
          this.productDetailProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompLoginCredentials(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.loginCredentials(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredentials = true;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = false;
          break;
        }
        case 1: {
          this.loginCredentials = false;
          this.loginCredentialsTrue = true;
          this.loginCredentialsProgress = false;
          break;
        }
        case 2: {
          this.loginCredentials = false;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressLoginCredentials(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.loginCredentials(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredentials = true;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = false;
          break;
        }
        case 1: {
          this.loginCredentials = false;
          this.loginCredentialsTrue = true;
          this.loginCredentialsProgress = false;
          break;
        }
        case 2: {
          this.loginCredentials = false;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompCatalogContent(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.catalogContent(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogContent = true;
          this.catalogContentTrue = false;
          this.catalogContentProgress = false;
          break;
        }
        case 1: {
          this.catalogContent = false;
          this.catalogContentTrue = true;
          this.catalogContentProgress = false;
          break;
        }
        case 2: {
          this.catalogContent = false;
          this.catalogContentTrue = false;
          this.catalogContentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressCatalogContent(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.catalogContent(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogContent = true;
          this.catalogContentTrue = false;
          this.catalogContentProgress = false;
          break;
        }
        case 1: {
          this.catalogContent = false;
          this.catalogContentTrue = true;
          this.catalogContentProgress = false;
          break;
        }
        case 2: {
          this.catalogContent = false;
          this.catalogContentTrue = false;
          this.catalogContentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompCatalogUploaded(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.catalogUpload(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressCatalogUploaded(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.catalogUpload(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompPayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.catalogPayment(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressPayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.catalogPayment(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompQcProcessing(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.qcprocessing(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].qc_processing) {
        case 0: {
          this.qc_processing = true;
          this.qc_processingTrue = false;
          this.qc_processingProgress = false;
          break;
        }
        case 1: {
          this.qc_processing = false;
          this.qc_processingTrue = true;
          this.qc_processingProgress = false;
          break;
        }
        case 2: {
          this.qc_processing = false;
          this.qc_processingTrue = false;
          this.qc_processingProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressQcProcessing(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.qcprocessing(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].qc_processing) {
        case 0: {
          this.qc_processing = true;
          this.qc_processingTrue = false;
          this.qc_processingProgress = false;
          break;
        }
        case 1: {
          this.qc_processing = false;
          this.qc_processingTrue = true;
          this.qc_processingProgress = false;
          break;
        }
        case 2: {
          this.qc_processing = false;
          this.qc_processingTrue = false;
          this.qc_processingProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompInventory(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.inventoryupdate(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdate = true;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = false;
          break;
        }
        case 1: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = true;
          break;
        }
        case 2: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = true;
          this.inventoryUpdateProgress = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressInventory(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.inventoryupdate(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdate = true;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = false;
          break;
        }
        case 1: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = true;
          this.inventoryUpdateProgress = false;
          break;
        }
        case 2: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompProductLive(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.productLive(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = true;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveTrue = true;
          this.productOnLiveProgress = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressProductLive(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.productLive(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveTrue = true;
          this.productOnLiveProgress = false;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateImgRecvd(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.imagesRecvd(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].imageReceived) {
        case 0: {
          this.imagesRec = true;
          this.imagesRecTrue = false;
          this.imagesRecProgress = false;
          break;
        }
        case 1: {
          this.imagesRec = false;
          this.imagesRecTrue = true;
          this.imagesRecProgress = false;
          break;
        }
        case 2: {
          this.imagesRec = false;
          this.imagesRecTrue = false;
          this.imagesRecProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Image Received Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
 updateProductDetails(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.productDetails(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailProgress = false;
          this.productDetailTrue = true;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailProgress = true;
          this.productDetailTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Product Details   Receieved';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateLoginCredentials(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.loginCredentials(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredentials = true;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = false;
          break;
        }
        case 1: {
          this.loginCredentials = false;
          this.loginCredentialsTrue = true;
          this.loginCredentialsProgress = false;
          break;
        }
        case 2: {
          this.loginCredentials = false;
          this.loginCredentialsTrue = false;
          this.loginCredentialsProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Login Credentials Received';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
    updateCatalogContent(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.catalogContent(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogContent = true;
          this.catalogContentTrue = false;
          this.catalogContentProgress = false;
          break;
        }
        case 1: {
          this.catalogContent = false;
          this.catalogContentTrue = true;
          this.catalogContentProgress = false;
          break;
        }
        case 2: {
          this.catalogContent = false;
          this.catalogContentTrue = false;
          this.catalogContentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Catalog Content Making Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateCatalogUploaded(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.catalogUpload(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Catalog Uploaded Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateQcProcessing(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.qcprocessing(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].qc_processing) {
        case 0: {
          this.qc_processing = true;
          this.qc_processingTrue = false;
          this.qc_processingProgress = false;
          break;
        }
        case 1: {
          this.qc_processing = false;
          this.qc_processingTrue = true;
          this.qc_processingProgress = false;
          break;
        }
        case 2: {
          this.qc_processing = false;
          this.qc_processingTrue = false;
          this.qc_processingProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'QC Processing Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateInventory(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.inventoryupdate(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdate = true;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = false;
          break;
        }
        case 1: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = true;
          this.inventoryUpdateProgress = false;
          break;
        }
        case 2: {
          this.inventoryUpdate = false;
          this.inventoryUpdateTrue = false;
          this.inventoryUpdateProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Inventory Updation Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateProductLive(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.productLive(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveTrue = true;
          this.productOnLiveProgress = false;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveTrue = false;
          this.productOnLiveProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Product Live';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updatePayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.catalogPayment(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Payment Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  sendNotification(mobileNumber, orderId , title) {
    this.title = title;
    this.notificationBody = 'Booking Id ' + orderId + 'completed';
    this.notificationModel = new Notification(
      mobileNumber,
      this.title,
    this.notificationBody
    );
    this.bookingService.pushNotification(this.notificationModel).subscribe(data => {
      console.log(data);
    });
  }

}
