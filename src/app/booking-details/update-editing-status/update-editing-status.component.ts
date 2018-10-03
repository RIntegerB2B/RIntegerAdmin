import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { EditingStatus } from './status.model';
import { Notification } from './notification.model';

@Component({
  selector: 'app-update-editing-status',
  templateUrl: './update-editing-status.component.html',
  styleUrls: ['./update-editing-status.component.css']
})
export class UpdateEditingStatusComponent implements OnInit {

  no;
  arrayLength;
  Status: EditingStatus;
    updateStatusForm: FormGroup;
  displayStatus: Boolean;
  progress: boolean;
  completed: boolean;
  imageReceived: boolean;
  imageReceivedTrue: boolean;
  imageReceivedProgress: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  imageEditingProgress: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  deliveryProgress: boolean;
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
    this.bookingService.getEditingStatus(id).subscribe(data => {
      this.Status = data;
      console.log(data[0]);
      switch (data[0].imageReceived) {
        case 0: {
          this.imageReceived = true;
          this.imageReceivedTrue = false;
          this.imageReceivedProgress = false;
          break;
        }
        case 1: {
          this.imageReceived = false;
          this.imageReceivedTrue = true;
          this.imageReceivedProgress = false;
          break;
        }
        case 2: {
          this.imageReceived = false;
          this.imageReceivedTrue = false;
          this.imageReceivedProgress = true;
          break;
        }
      }
      switch (data[0].editing) {
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
      switch (data[0].imageDelivery) {
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

}
