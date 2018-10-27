import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import {Booking} from '../../shared/bookings.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
import {DigitalMgmtBooking} from './digital-mgmt.model';
import {MarketingMgmtService} from '../marketing-mgmt.service';
import {Notification} from '../../shared/notification.model';

@Component({
  selector: 'app-digital-mgmt-booking',
  templateUrl: './digital-mgmt-booking.component.html',
  styleUrls: ['./digital-mgmt-booking.component.css']
})
export class DigitalMgmtBookingComponent implements OnInit {
  notificationBody: string;
  title: any;
  titleToSent: string;
  notificationModel: Notification;
  bookingDetail: Booking[] = [];
  viewDigitalMgmtBookingForm: FormGroup;
  bookingCount;
  DigitalModel: DigitalMgmtBooking;
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
      this.newBookings();
    }
    createForm() {
      this.viewDigitalMgmtBookingForm = this.fb.group({
        no: ['']
      });
    }
  newBookings() {
    this.showNewBooking = true;
    this.showConfirmBooking = false;
    this.showCancelBooking = false;
    this.showCompletedOrders = false;
    this.marketMgmtService.getDigitalMarketingBooking().subscribe(data => {
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
    this.marketMgmtService.approvedDigitalMarketingBooking().subscribe(data => {
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
    this.marketMgmtService.cancelledDigitalMarketingBooking().subscribe(data => {
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
    this.marketMgmtService.completedDigitalMarketingBooking().subscribe(data => {
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
    this.marketMgmtService.digitalMarketingBookingApproval( id).subscribe(data => {
      this.bookingDetail = data;
      this.bookingCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Digital Management Booking  Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelledBookingApproval( id, bookingID, mobileNumber) {
    this.action = 'Aproved';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.approvalForCancelledDigitalMarketingBooking( id).subscribe(data => {
      this.bookingDetail = data;
      this.cancelCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Digital Management Booking  Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelBooking( id, bookingID) {
    this.action = 'Cancelled';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.digitalMarketingBookinCancel( id).subscribe(data => {
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
    this.marketMgmtService.newDigitalMarketingBookingCancel( id).subscribe(data => {
      this.bookingDetail = data;
      this.confirmCount = data.length;
    }, error => {
      console.log(error);
    });
  }
  updateStatus(no) {
    this.router.navigate(['navheader/monthlyplan', no]);
  }
  viewDetails(no) {
    this.marketMgmtService.getDigitalMarketingBookingDetails(no).subscribe(sample => {
      this.DigitalModel = sample;
    }, error => {
      console.log(error);
    });
    const dialogRef = this.dialog.open(DigitalMgmtViewComponent, {
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
    templateUrl: './digital-mgmt-view.component.html'
  })
  export class DigitalMgmtViewComponent implements OnInit {
    viewDigitalMgmtDetailsForm: FormGroup;
    DigitalModel: DigitalMgmtBooking;
    constructor(private fb: FormBuilder, private marketMgmtService: MarketingMgmtService,
       public dialogRef: MatDialogRef<DigitalMgmtViewComponent>,
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
      this.viewDigitalMgmtDetailsForm = this.fb.group({
        no: ['']
      });
    }
    viewEditingBookingDetails() {
      this.marketMgmtService.getDigitalMarketingBookingDetails(this.data).subscribe(sample => {
        this.DigitalModel = sample;
      }, error => {
        console.log(error);
      });
    }
  }
