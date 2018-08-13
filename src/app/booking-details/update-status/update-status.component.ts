import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { Status } from './status.model';
import { StatusDetail } from './status-forOne.model';


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
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  payment: boolean;
  paymentTrue: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  updateGridView: boolean;
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
    }, error => {
      console.log(error);
    });
  }
  statusView(updateStatusForm: FormGroup, no: any, ID: any) {
    console.log(ID);
    this.displayStatus = true;
    this.updateGridView = false;
    this.bookingService.getStatus(no, ID).subscribe(data => {
      this.statusDetail = data;
      switch (data.order) {
        case false: {
          this.progress = true;
          break;
        }
        case true: {
          this.completed = true;
          break;
        }
      }
      switch (data.materialPickedUp) {
        case false: {
          this.materialPicked = true;
          this.materialPickedTrue = false;
          break;
        }
        case true: {
          this.materialPicked = false;
          this.materialPickedTrue = true;
          break;
        }
      }
      switch (data.shootCompleted) {
        case false: {
          this.shootCompleted = true;
          this.shootCompletedTrue = false;
          break;
        }
        case true: {
          this.shootCompleted = false;
          this.shootCompletedTrue = true;
          break;
        }
      }
      switch (data.imageEditing) {
        case false: {
          this.imageEditing = true;
          this.imageEditingTrue = false;
          break;
        }
        case true: {
          this.imageEditing = false;
          this.imageEditingTrue = true;
          break;
        }
      }
      switch (data.delivery) {
        case false: {
          this.delivery = true;
          this.deliveryTrue = false;
          break;
        }
        case true: {
          this.deliveryTrue = true;
          this.delivery = false;
          break;
        }
      }
      switch (data.payment) {
        case false: {
          this.payment = true;
          this.paymentTrue = false;
          break;
        }
        case true: {
          this.payment = false;
          this.paymentTrue = true;
          break;
        }
      }
      switch (data.materialReturn) {
        case false: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          break;
        }
        case true: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  updateStatus() {
    this.updateGridView = true;
    this.displayStatus = false;
  }
 /*  msg() {
    alert('subscribe');
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.bookingService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
  } */

  updateMateialPick(updateStatusForm: FormGroup, mobileNumber: any, id: any) {
    this.bookingService.updateMaterialStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

  }
  updateShooting(updateStatusForm: FormGroup, mobileNumber: any, id: any) {
    this.bookingService.updateShootingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  updateImagedEditing(updateStatusForm: FormGroup, mobileNumber: any, id: any) {
    this.bookingService.imageEditingStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  updateDelivery(updateStatusForm: FormGroup, mobileNumber: any, id: any) {
    this.bookingService.delieveryStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  updatePayment(updateStatusForm: FormGroup, mobileNumber: any, id: any) {
    this.bookingService.paymentStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  updateMaterialReturn(updateStatusForm: FormGroup, mobileNumber: any, id: any) {
    this.bookingService.materialReturnStatus(mobileNumber, id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
