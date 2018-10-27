import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProductionMgmtService } from '../production-mgmt.service';
import {Booking} from '../../shared/bookings.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
import {Creative} from './creative.model';
import {Notification} from '../../shared/notification.model';

@Component({
  selector: 'app-creative-booking',
  templateUrl: './creative-booking.component.html',
  styleUrls: ['./creative-booking.component.css']
})
export class CreativeBookingComponent implements OnInit {
  notificationBody: string;
  title: any;
  titleToSent: string;
  notificationModel: Notification;
  bookingDetail: Booking[] = [];
  viewCreativeBookingForm: FormGroup;
  bookingCount;
  creativeModel: Creative;
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
  constructor(private fb: FormBuilder, private router: Router, private productionService: ProductionMgmtService,
    private navheaderService: NavheaderService, private snackBar: MatSnackBar, private dialog: MatDialog) {
     }

     ngOnInit() {
      this.navheaderService.makeMenuTransparent();
      this.createForm();
      this.newBookings();
    }
    createForm() {
      this.viewCreativeBookingForm = this.fb.group({
        no: ['']
      });
    }
  newBookings() {
    this.showNewBooking = true;
    this.showConfirmBooking = false;
    this.showCancelBooking = false;
    this.showCompletedOrders = false;
    this.productionService.getCreativeBooking().subscribe(data => {
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
    this.productionService.approvedCreativeBooking().subscribe(data => {
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
    this.productionService.cancelledCreativeBooking().subscribe(data => {
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
    this.productionService.completedCreativeBooking().subscribe(data => {
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
    this.productionService.creativeBookingApproval( id).subscribe(data => {
      this.bookingDetail = data;
      this.bookingCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Creative Booking Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelledBookingApproval( id, bookingID, mobileNumber) {
    this.action = 'Aproved';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.productionService.approvalForCancelledCreativeBooking( id).subscribe(data => {
      this.bookingDetail = data;
      this.cancelCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Creative Booking Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelBooking( id, bookingID) {
    this.action = 'Cancelled';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.productionService.creativeBookingCancel( id).subscribe(data => {
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
    this.productionService.newCreativeBookingCancel( id).subscribe(data => {
      this.bookingDetail = data;
      this.confirmCount = data.length;
    }, error => {
      console.log(error);
    });
  }
  updateStatus(no) {
    this.router.navigate(['/navheader/creativestatus', no]);
  }
  viewDetails(no) {
    this.productionService.getCreativeBookingDetails(no).subscribe(sample => {
      this.creativeModel = sample;
    }, error => {
      console.log(error);
    });
    const dialogRef = this.dialog.open(CreativeBookingViewComponent, {
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
    this.productionService.pushNotification(this.notificationModel).subscribe(data => {
    });
  }
  }
  @Component({
    templateUrl: './creative-booking-view.component.html'
  })
  export class CreativeBookingViewComponent implements OnInit {
    viewCreativeDetailsForm: FormGroup;
    creativeModel: Creative;
    constructor(private fb: FormBuilder, private productionService: ProductionMgmtService,
       public dialogRef: MatDialogRef<CreativeBookingViewComponent>,
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
      this.viewCreativeDetailsForm = this.fb.group({
        no: ['']
      });
    }
    viewEditingBookingDetails() {
      this.productionService.getCreativeBookingDetails(this.data).subscribe(sample => {
        this.creativeModel = sample;
      }, error => {
        console.log(error);
      });
    }
  }