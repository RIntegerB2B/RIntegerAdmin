import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import {Booking} from '../../shared/bookings.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
import {RegistrationBooking} from './registration.model';
import {MarketingMgmtService} from '../marketing-mgmt.service';
import {Notification} from '../../shared/notification.model';

@Component({
  selector: 'app-registration-setup-booking',
  templateUrl: './registration-setup-booking.component.html',
  styleUrls: ['./registration-setup-booking.component.css']
})
export class RegistrationSetupBookingComponent implements OnInit {
  notificationBody: string;
  title: any;
  titleToSent: string;
  notificationModel: Notification;
  bookingDetail: Booking[] = [];
  viewRegistrationBookingForm: FormGroup;
  bookingCount;
  RegistrationModel: RegistrationBooking;
  showNewBooking: boolean;
  showConfirmBooking: boolean;
  showCancelBooking: boolean;
  showMessage: boolean;
  showCompletedOrders: boolean;
  confirmCount;
  cancelCount;
  completedCount;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private marketMgmtService: MarketingMgmtService,
    private navheaderService: NavheaderService, private snackBar: MatSnackBar, private dialog: MatDialog) {
     }
     ngOnInit() {
      this.navheaderService.makeMenuTransparent();
      this.createForm();
      this.confirmedBookings();
    }
    createForm() {
      this.viewRegistrationBookingForm = this.fb.group({
        no: ['']
      });
    }
  newBookings() {
    this.showNewBooking = true;
    this.showConfirmBooking = false;
    this.showCancelBooking = false;
    this.showCompletedOrders = false;
    this.marketMgmtService.getRegistrationBooking().subscribe(data => {
      console.log(data);
      this.bookingCount = data.length;
      if (data.length === 0) {
  this.showMessage = true;
      } else {
        this.showMessage = false;
      }
      this.bookingDetail = data;
    }, error => {
      console.log(error);
    });
  }
  confirmedBookings() {
    this.showNewBooking = false;
    this.showConfirmBooking = true;
    this.showCancelBooking = false;
    this.showCompletedOrders = false;
    this.marketMgmtService.approvedRegistrationBooking().subscribe(data => {
      this.bookingDetail = data;
      this.confirmCount = data.length;
      if (data.length === 0) {
        this.showMessage = true;
            } else {
              this.showMessage = false;
            }
    }, error => {
      console.log(error);
    });
  }
  cancelledBookings() {
    this.showNewBooking = false;
    this.showConfirmBooking = false;
    this.showCancelBooking = true;
    this.showCompletedOrders = false;
    this.marketMgmtService.cancelledRegistrationBooking().subscribe(data => {
      this.bookingDetail = data;
      this.cancelCount = data.length;
      if (data.length === 0) {
        this.showMessage = true;
            } else {
              this.showMessage = false;
            }
    }, error => {
      console.log(error);
    });
  }
  completedOrders() {
    this.showNewBooking = false;
    this.showConfirmBooking = false;
    this.showCancelBooking = false;
    this.showCompletedOrders = true;
    this.marketMgmtService.completedRegistrationBooking().subscribe(data => {
      this.bookingDetail = data;
      this.completedCount = data.length;
      if (data.length === 0) {
        this.showMessage = true;
            } else {
              this.showMessage = false;
            }
    }, error => {
      console.log(error);
    });
  }
  giveApproval( id, bookingID, mobileNumber) {
    this.action = 'Aproved';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.registrationBookingApproval( id).subscribe(data => {
      this.bookingDetail = data;
      this.bookingCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Registration Setup Booking  Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelledBookingApproval( id, bookingID, mobileNumber) {
    this.action = 'Aproved';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.approvalForCancelledRegistrationBooking( id).subscribe(data => {
      this.bookingDetail = data;
      this.cancelCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Registration Setup  Booking Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelBooking( id, bookingID) {
    this.action = 'Cancelled';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.registrationBookingCancel( id).subscribe(data => {
      this.bookingDetail = data;
      this.confirmCount = data.length;
    }, error => {
      console.log(error);
    });
  }
  cancelNewBooking(id, bookingID) {
    this.action = 'Cancelled';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.newRegistrationBookingCancel( id).subscribe(data => {
      this.bookingDetail = data;
      this.confirmCount = data.length;
    }, error => {
      console.log(error);
    });
  }
  updateStatus(no) {
    this.router.navigate(['/creativestatus', no]);
  }
  viewDetails(no) {
    this.marketMgmtService.getRegistrationBookingDetails(no).subscribe(sample => {
      this.RegistrationModel = sample;
    }, error => {
      console.log(error);
    });
    const dialogRef = this.dialog.open(RegistrationBookingViewComponent, {
      width: '1020px',
      disableClose: true,
      data: no
    });
    dialogRef.afterClosed();
  }
  sendNotification(mobileNumber,  orderId , title) {
    this.title = title;
    this.notificationBody = 'Order ' + orderId + 'confirmed';
    this.notificationModel = new Notification(
      mobileNumber,
      this.title,
    this.notificationBody
    );
    this.marketMgmtService.pushNotification(this.notificationModel).subscribe(data => {
    });
  }
  }
  @Component({
    templateUrl: './registration-booking-view.component.html'
  })
  export class RegistrationBookingViewComponent implements OnInit {
    viewRegistrationDetailsForm: FormGroup;
    RegistrationModel: RegistrationBooking;
    constructor(private fb: FormBuilder, private marketMgmtService: MarketingMgmtService,
       public dialogRef: MatDialogRef<RegistrationBookingViewComponent>,
       @Inject(MAT_DIALOG_DATA) public data) {
         console.log(data);
    }
    cancel(): void {
      this.dialogRef.close();
    }
    ngOnInit() {
      this.createViewForm();
      this.viewEditingBookingDetails();
    }
    createViewForm() {
      this.viewRegistrationDetailsForm = this.fb.group({
        no: ['']
      });
    }
    viewEditingBookingDetails() {
      this.marketMgmtService.getRegistrationBookingDetails(this.data).subscribe(sample => {
        this.RegistrationModel = sample;
      }, error => {
        console.log(error);
      });
    }
  }
