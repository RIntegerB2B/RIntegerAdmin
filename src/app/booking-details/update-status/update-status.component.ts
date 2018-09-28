import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { Status } from './status.model';
import { StatusDetail } from './status-forOne.model';
import { Notification } from './notification.model';


@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  no;
  toshow: Status;
  statusDetail: StatusDetail[] = [];
    updateStatusForm: FormGroup;
  displayStatus: Boolean;
  progress: boolean;
  completed: boolean;
  materialPicked: boolean;
  materialPickedTrue: boolean;
  materialPickedProgress: boolean;
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  shootCompletedProgress: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  imageEditingProgress: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  deliveryProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  materialReturnProgress: boolean;
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
    this.updateStatusForm = this.fb.group({
      mobileNo: [''],
      id: ['']
    });
  }
  getStatus(id) {
    this.bookingService.getStatusDetail(id).subscribe(data => {
      this.toshow = data;
      console.log(data);
      /* this.statusView( data.mobileNumber, id); */
    }, error => {
      console.log(error);
    });
  }
  /* giveApproval(mobileNumber, id) {
    this.bookingService.bookingApproval(mobileNumber, id).subscribe(data => {
    console.log(data);
    this.confirmed = true;
    this.cancelled = false;
    this.hide = true;
    }, error => {
      console.log(error);
    });
  }
  cancel(num: any, Id: any) {
    this.bookingService.cancelBooking(num, Id).subscribe(data => {
      this.confirmed = false;
      this.cancelled = true;
      this.hide = true;
    });
    } */
  statusView( no: any, ID: any) {
    this.displayStatus = true;
    this.bookingService.getStatus(no, ID).subscribe(data => {
      this.statusDetail = data ;
      console.log(data);
      switch (data.order) {
        case 0: {
          this.progress = true;
          break;
        }
        case 1: {
          this.completed = true;
          break;
        }
      }
      switch (data.materialPickedUp) {
        case 0: {
          this.materialPicked = true;
          this.materialPickedTrue = false;
          this.materialPickedProgress = false;
          break;
        }
        case 1: {
          this.materialPicked = false;
          this.materialPickedTrue = true;
          this.materialPickedProgress = false;
          break;
        }
        case 2: {
          this.materialPicked = false;
          this.materialPickedTrue = false;
          this.materialPickedProgress = true;
          break;
        }
      }
      switch (data.shootCompleted) {
        case 0: {
          this.shootCompleted = true;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = false;
          break;
        }
        case 1: {
          this.shootCompleted = false;
          this.shootCompletedProgress = false;
          this.shootCompletedTrue = true;
          break;
        }
        case 2: {
          this.shootCompleted = false;
          this.shootCompletedProgress = true;
          this.shootCompletedTrue = false;
          break;
        }
      }
      switch (data.imageEditing) {
        case 0: {
          this.imageEditing = true;
          this.imageEditingTrue = false;
          this.imageEditingProgress = false;
          break;
        }
        case 1: {
          this.imageEditing = false;
          this.imageEditingProgress = false;
          this.imageEditingTrue = true;
          break;
        }
        case 2: {
          this.imageEditing = false;
          this.imageEditingProgress = true;
          this.imageEditingTrue = false;
          break;
        }
      }
      switch (data.delivery) {
        case 0: {
          this.delivery = true;
          this.deliveryTrue = false;
          this.deliveryProgress = false;
          break;
        }
        case 1: {
          this.deliveryTrue = true;
          this.delivery = false;
          this.deliveryProgress = false;
          break;
        }
        case 2: {
          this.deliveryTrue = false;
          this.delivery = false;
          this.deliveryProgress = true;
          break;
        }
      }
      switch (data.payment) {
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
      switch (data.materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnProgress = false;
          this.materialReturnTrue = false;
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
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  // not completed
  notCompMaterialPick(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.notCompletedMaterialStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  notCompShooting(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.notCompletedShootingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  notCompImagedEditing(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.notCompImagedEditingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  notCompDelivery(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.notCompDeliveryStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  notCompMaterialReturn(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.notCompMaterialReturnStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  notCompPayment(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.notCompPaymentStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
   // progress
  progressMateialPick(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.progressMaterialStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  progressShooting(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.progressShootingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  progressImagedEditing(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.progressImagedEditingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  progressDelivery(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.progressDeliveryStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  progressPayment(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.progressPaymentStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  progressMaterialReturn(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.progressMaterialReturnStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  // completed
  updateMateialPick(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    console.log(this.no);
    this.bookingService.updateMaterialStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Material picked up completed';
this.sendNotification(mobileNumber, id , orderId , this.titleToSent);
  }
  updateShooting(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.updateShootingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Photo shoot completed';
this.sendNotification(mobileNumber, id , orderId , this.titleToSent);
  }

  updateImagedEditing(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.imageEditingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Image Editing completed';
    this.sendNotification(mobileNumber, id , orderId , this.titleToSent);
  }
  updateDelivery(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.delieveryStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Image Delivery completed';
    this.sendNotification(mobileNumber, id , orderId , this.titleToSent);
  }
  updatePayment(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.paymentStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Payment completed';
    this.sendNotification(mobileNumber, id , orderId , this.titleToSent);
  }
  updateMaterialReturn(updateStatusForm: FormGroup, mobileNumber: any, id: any, orderId: any) {
    this.bookingService.materialReturnStatus(mobileNumber, orderId).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Material return completed';
    this.sendNotification(mobileNumber, id , orderId , this.titleToSent);
  }
  sendNotification(mobileNumber, id , orderId , title) {
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
