import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { RegistrationStatus } from './status.model';
import { Notification } from './notification.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
@Component({
  selector: 'app-update-registartion-status',
  templateUrl: './update-registartion-status.component.html',
  styleUrls: ['./update-registartion-status.component.css']
})
export class UpdateRegistartionStatusComponent implements OnInit {

  accountCreationsProgress: boolean;
  accountCreationsTrue: boolean;
  accountCreations: boolean;
  documentsReq: boolean;
  documentsReqTrue: boolean;
  documentsReqProgress: boolean;
  no;
  value;
  Status: RegistrationStatus;
    updateRegistrationStatusForm: FormGroup;
  displayStatus: Boolean;
  progress: boolean;
  completed: boolean;
  brandReg: boolean;
  brandRegTrue: boolean;
  brandRegProgress: boolean;
  verification: boolean;
  verificationTrue: boolean;
  verificationProgress: boolean;
  activation: boolean;
  activationTrue: boolean;
  activationProgress: boolean;
  details: boolean;
  detailsTrue: boolean;
  detailsProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
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
    private activatedRoute: ActivatedRoute, private bookingService: BookingDetailsService, private navheaderService: NavheaderService,
    private swUpdate: SwUpdate, private swPush: SwPush) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
  }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
    this.getStatus(this.no);
  }
  createForm() {
    this.updateRegistrationStatusForm = this.fb.group({
      mobileNo: [''],
      id: ['']
    });
  }
  getStatus(id) {
    this.bookingService.getRegistrationStatus(id).subscribe(data => {
      this.Status = data;
      console.log(data);
      switch (data[0].documentsRequired) {
        case 0: {
          this.documentsReq = true;
          this.documentsReqTrue = false;
          this.documentsReqProgress = false;
          break;
        }
        case 1: {
          this.documentsReq = false;
          this.documentsReqTrue = true;
          this.documentsReqProgress = false;
          break;
        }
        case 2: {
          this.documentsReq = false;
          this.documentsReqTrue = false;
          this.documentsReqProgress = true;
          break;
        }
      }
      switch (data[0].accountCreation) {
        case 0: {
          this.accountCreations = true;
          this.accountCreationsTrue = false;
          this.accountCreationsProgress = false;
          break;
        }
        case 1: {
          this.accountCreations = false;
          this.accountCreationsProgress = false;
          this.accountCreationsTrue = true;
          break;
        }
        case 2: {
          this.accountCreations = false;
          this.accountCreationsProgress = true;
          this.accountCreationsTrue = false;
          break;
        }
      }
      switch (data[0].brandRegistration) {
        case 0: {
          this.brandReg = true;
          this.brandRegTrue = false;
          this.brandRegProgress = false;
          break;
        }
        case 1: {
          this.brandRegTrue = true;
          this.brandReg = false;
          this.brandRegProgress = false;
          break;
        }
        case 2: {
          this.brandRegTrue = false;
          this.brandReg = false;
          this.brandRegProgress = true;
          break;
        }
      }
      switch (data[0]. account_brandVerification) {
        case 0: {
          this.verification = true;
          this.verificationTrue = false;
          this.verificationProgress = false;
          break;
        }
        case 1: {
          this.verificationTrue = true;
          this.verification = false;
          this.verificationProgress = false;
          break;
        }
        case 2: {
          this.verificationTrue = false;
          this.verification = false;
          this.verificationProgress = true;
          break;
        }
      }
      switch (data[0]. accountActivation) {
        case 0: {
          this.activation = true;
          this.activationTrue = false;
          this.activationProgress = false;
          break;
        }
        case 1: {
          this.activationTrue = true;
          this.activation = false;
          this.activationProgress = false;
          break;
        }
        case 2: {
          this.activationTrue = false;
          this.activation = false;
          this.activationProgress = true;
          break;
        }
      }
      switch (data[0]. detailsForwarding) {
        case 0: {
          this.details = true;
          this.detailsTrue = false;
          this.detailsProgress = false;
          break;
        }
        case 1: {
          this.detailsTrue = true;
          this.details = false;
          this.detailsProgress = false;
          break;
        }
        case 2: {
          this.detailsTrue = false;
          this.details = false;
          this.detailsProgress = true;
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
  notCompDoc(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.documentsReq(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].documentsRequired) {
        case 0: {
          this.documentsReq = true;
          this.documentsReqTrue = false;
          this.documentsReqProgress = false;
          break;
        }
        case 1: {
          this.documentsReq = false;
          this.documentsReqTrue = true;
          this.documentsReqProgress = false;
          break;
        }
        case 2: {
          this.documentsReq = false;
          this.documentsReqTrue = false;
          this.documentsReqProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressDoc(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.documentsReq(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].documentsRequired) {
        case 0: {
          this.documentsReq = true;
          this.documentsReqTrue = false;
          this.documentsReqProgress = false;
          break;
        }
        case 1: {
          this.documentsReq = false;
          this.documentsReqTrue = true;
          this.documentsReqProgress = false;
          break;
        }
        case 2: {
          this.documentsReq = false;
          this.documentsReqTrue = false;
          this.documentsReqProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateDoc(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.documentsReq(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].documentsRequired) {
        case 0: {
          this.documentsReq = true;
          this.documentsReqTrue = false;
          this.documentsReqProgress = false;
          break;
        }
        case 1: {
          this.documentsReq = false;
          this.documentsReqTrue = true;
          this.documentsReqProgress = false;
          break;
        }
        case 2: {
          this.documentsReq = false;
          this.documentsReqTrue = false;
          this.documentsReqProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Document Collected';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompAccCreation(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.accountCreation(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].accountCreation) {
        case 0: {
          this.accountCreations = true;
          this.accountCreationsTrue = false;
          this.accountCreationsProgress = false;
          break;
        }
        case 1: {
          this.accountCreations = false;
          this.accountCreationsProgress = false;
          this.accountCreationsTrue = true;
          break;
        }
        case 2: {
          this.accountCreations = false;
          this.accountCreationsProgress = true;
          this.accountCreationsTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressAccCreation(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.accountCreation(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].accountCreation) {
        case 0: {
          this.accountCreations = true;
          this.accountCreationsTrue = false;
          this.accountCreationsProgress = false;
          break;
        }
        case 1: {
          this.accountCreations = false;
          this.accountCreationsProgress = false;
          this.accountCreationsTrue = true;
          break;
        }
        case 2: {
          this.accountCreations = false;
          this.accountCreationsProgress = true;
          this.accountCreationsTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateAccCreation(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.accountCreation(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].accountCreation) {
        case 0: {
          this.accountCreations = true;
          this.accountCreationsTrue = false;
          this.accountCreationsProgress = false;
          break;
        }
        case 1: {
          this.accountCreations = false;
          this.accountCreationsProgress = false;
          this.accountCreationsTrue = true;
          break;
        }
        case 2: {
          this.accountCreations = false;
          this.accountCreationsProgress = false;
          this.accountCreationsTrue = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Account Creation';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompBrandReg(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.brandRegistration(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].brandRegistration) {
        case 0: {
          this.brandReg = true;
          this.brandRegTrue = false;
          this.brandRegProgress = false;
          break;
        }
        case 1: {
          this.brandRegTrue = true;
          this.brandReg = false;
          this.brandRegProgress = false;
          break;
        }
        case 2: {
          this.brandRegTrue = false;
          this.brandReg = false;
          this.brandRegProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressBrandReg(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.brandRegistration(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].brandRegistration) {
        case 0: {
          this.brandReg = true;
          this.brandRegTrue = false;
          this.brandRegProgress = false;
          break;
        }
        case 1: {
          this.brandRegTrue = true;
          this.brandReg = false;
          this.brandRegProgress = false;
          break;
        }
        case 2: {
          this.brandRegTrue = false;
          this.brandReg = false;
          this.brandRegProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateBrandReg(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.brandRegistration(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].brandRegistration) {
        case 0: {
          this.brandReg = true;
          this.brandRegTrue = false;
          this.brandRegProgress = false;
          break;
        }
        case 1: {
          this.brandRegTrue = true;
          this.brandReg = false;
          this.brandRegProgress = false;
          break;
        }
        case 2: {
          this.brandRegTrue = false;
          this.brandReg = false;
          this.brandRegProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Brand Registration';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompVerfication(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.verification(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. account_brandVerification) {
        case 0: {
          this.verification = true;
          this.verificationTrue = false;
          this.verificationProgress = false;
          break;
        }
        case 1: {
          this.verificationTrue = true;
          this.verification = false;
          this.verificationProgress = false;
          break;
        }
        case 2: {
          this.verificationTrue = false;
          this.verification = false;
          this.verificationProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressVerfication(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.verification(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. account_brandVerification) {
        case 0: {
          this.verification = true;
          this.verificationTrue = false;
          this.verificationProgress = false;
          break;
        }
        case 1: {
          this.verificationTrue = true;
          this.verification = false;
          this.verificationProgress = false;
          break;
        }
        case 2: {
          this.verificationTrue = false;
          this.verification = false;
          this.verificationProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateVerfication(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.verification(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. account_brandVerification) {
        case 0: {
          this.verification = true;
          this.verificationTrue = false;
          this.verificationProgress = false;
          break;
        }
        case 1: {
          this.verificationTrue = true;
          this.verification = false;
          this.verificationProgress = false;
          break;
        }
        case 2: {
          this.verificationTrue = false;
          this.verification = false;
          this.verificationProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Account & Brand Verification';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompActivation(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.activation(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. accountActivation) {
        case 0: {
          this.activation = true;
          this.activationTrue = false;
          this.activationProgress = false;
          break;
        }
        case 1: {
          this.activationTrue = true;
          this.activation = false;
          this.activationProgress = false;
          break;
        }
        case 2: {
          this.activationTrue = false;
          this.activation = false;
          this.activationProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressActivation(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.activation(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. accountActivation) {
        case 0: {
          this.activation = true;
          this.activationTrue = false;
          this.activationProgress = false;
          break;
        }
        case 1: {
          this.activationTrue = true;
          this.activation = false;
          this.activationProgress = false;
          break;
        }
        case 2: {
          this.activationTrue = false;
          this.activation = false;
          this.activationProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateActivation(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.activation(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. accountActivation) {
        case 0: {
          this.activation = true;
          this.activationTrue = false;
          this.activationProgress = false;
          break;
        }
        case 1: {
          this.activationTrue = true;
          this.activation = false;
          this.activationProgress = false;
          break;
        }
        case 2: {
          this.activationTrue = false;
          this.activation = false;
          this.activationProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Account Activation Forwarded';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompDetails(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.detailsForward(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. detailsForwarding) {
        case 0: {
          this.details = true;
          this.detailsTrue = false;
          this.detailsProgress = false;
          break;
        }
        case 1: {
          this.detailsTrue = true;
          this.details = false;
          this.detailsProgress = false;
          break;
        }
        case 2: {
          this.detailsTrue = false;
          this.details = false;
          this.detailsProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressDetails(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.detailsForward(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. detailsForwarding) {
        case 0: {
          this.details = true;
          this.detailsTrue = false;
          this.detailsProgress = false;
          break;
        }
        case 1: {
          this.detailsTrue = true;
          this.details = false;
          this.detailsProgress = false;
          break;
        }
        case 2: {
          this.detailsTrue = false;
          this.details = false;
          this.detailsProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateDetails(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.detailsForward(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0]. detailsForwarding) {
        case 0: {
          this.details = true;
          this.detailsTrue = false;
          this.detailsProgress = false;
          break;
        }
        case 1: {
          this.detailsTrue = true;
          this.details = false;
          this.detailsProgress = false;
          break;
        }
        case 2: {
          this.detailsTrue = false;
          this.details = false;
          this.detailsProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Details Forwarded';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  notCompPayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.registrationPayment(mobileNumber, orderId, this.value).subscribe(data => {
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
  progressPayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.registrationPayment(mobileNumber, orderId, this.value).subscribe(data => {
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
  updatePayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.registrationPayment(mobileNumber, orderId, this.value).subscribe(data => {
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
    this.titleToSent =  'Payment';
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
    });
  }
}
