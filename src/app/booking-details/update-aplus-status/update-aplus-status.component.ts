import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { AplusCatalogingStatus } from './status.model';
import { Notification } from './notification.model';
import {NavheaderService} from '../../nav-header/nav-header.service';

@Component({
  selector: 'app-update-aplus-status',
  templateUrl: './update-aplus-status.component.html',
  styleUrls: ['./update-aplus-status.component.css']
})
export class UpdateAplusStatusComponent implements OnInit {
  materialReturnProgress: boolean;
  materialReturnTrue: boolean;
  materialReturn: boolean;
  postProductionWorkTrue: boolean;
  postProductionWorkProgress: boolean;
  postProductionWork: boolean;
  shootProgress: boolean;
  shootTrue: boolean;
  shoot: boolean;
  materialPickedUpTrue: boolean;
  materialPickedUpProgress: boolean;
  materialPickedUp: boolean;
  shootPlanningProgress: boolean;
  shootPlanningTrue: boolean;
  shootPlanning: boolean;
  no;
  value;
  Status: AplusCatalogingStatus;
  updateAplusStatusForm: FormGroup;
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
    private swUpdate: SwUpdate, private swPush: SwPush, private navheaderService: NavheaderService) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
  }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
    this.getStatus(this.no);
  }
  createForm() {
    this.updateAplusStatusForm = this.fb.group({
      mobileNo: [''],
      id: ['']
    });
  }
  getStatus(id) {
    this.bookingService.getAplusStatus(id).subscribe(data => {
      this.Status = data;
      console.log(data[0]);
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningProgress = false;
          this.shootPlanningTrue = true;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningProgress = true;
          this.shootPlanningTrue = false;
          break;
        }
      }
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shootTrue = true;
          this.shoot = false;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shootTrue = false;
          this.shoot = false;
          this.shootProgress = true;
          break;
        }
      }
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
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
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnProgress = false;
          this.materialReturnTrue = true;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnProgress = true;
          this.materialReturnTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompMaterialPickedUp(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusMaterialPickUp(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressMaterialPickedUp(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusMaterialPickUp(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateMaterialPickedUp(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusMaterialPickUp(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Material PickUp completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompShootPlanning(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusShootPlanning(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningTrue = true;
          this.shootPlanningProgress = false;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressShootPlanning(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusShootPlanning(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningTrue = true;
          this.shootPlanningProgress = false;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateShootPlanning(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusShootPlanning(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningTrue = true;
          this.shootPlanningProgress = false;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Shoot planning completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompShoot(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusShootCompleted(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shoot = false;
          this.shootTrue = true;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shoot = false;
          this.shootTrue = false;
          this.shootProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressShoot(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusShootCompleted(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shoot = false;
          this.shootTrue = true;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shoot = false;
          this.shootTrue = false;
          this.shootProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateShoot(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusShootCompleted(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shoot = false;
          this.shootTrue = true;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shoot = false;
          this.shootTrue = false;
          this.shootProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Shoot completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompPostProductionWork(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusPostProduction(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressPostProductionWork(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusPostProduction(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updatePostProductionWork(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusPostProduction(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Post Production Work completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompProductDetails(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusProductDetails(mobileNumber, orderId, this.value).subscribe(data => {
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
    this.bookingService.aplusProductDetails(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateProductDetails(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusProductDetails(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompLoginCredentials(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusLoginCredentials(mobileNumber, orderId, this.value).subscribe(data => {
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
    this.bookingService.aplusLoginCredentials(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateLoginCredentials(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusLoginCredentials(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompCatalogContent(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusCatalogContent(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressCatalogContent(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusCatalogContent(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateCatalogContent(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusCatalogContent(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompCatalogUploaded(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusCatalogUpload(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressCatalogUploaded(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusCatalogUpload(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateCatalogUploaded(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusCatalogUpload(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompQcProcessing(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusQcProcessing(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressQcProcessing(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusQcProcessing(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateQcProcessing(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusQcProcessing(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompInventory(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusInventory(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressInventory(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusInventory(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateInventory(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusInventory(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompProductLive(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusProductLive(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressProductLive(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusProductLive(mobileNumber, orderId, this.value).subscribe(data => {
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
  updateProductLive(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusProductLive(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompPayment(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusPayment(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressPayment(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusPayment(mobileNumber, orderId, this.value).subscribe(data => {
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
  updatePayment(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusPayment(mobileNumber, orderId, this.value).subscribe(data => {
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
  notCompMaterialReturn(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.aplusMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressMaterialReturn(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.aplusMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateMaterialReturn(updateAplusStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.aplusMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Material Return Completed';
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
