import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProductionMgmtService } from '../production-mgmt.service';
import {Booking} from '../../shared/bookings.model';
import {Notification} from '../../shared/notification.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
import {ScheduledBooking} from './scheduled-booking.model';
import { BookingDetail } from '../../booking-details/view-booking/booking-detail.model';

@Component({
  selector: 'app-scheduled-model-booking',
  templateUrl: './scheduled-model-booking.component.html',
  styleUrls: ['./scheduled-model-booking.component.css']
})
export class ScheduledModelBookingComponent implements OnInit {

  titleToSent: string;
  title: any;
  notificationBody: string;
modelBooking: ScheduledBooking;
  bookingDetail: Booking[] = [];
  notificationModel: Notification;
  viewScheduledBookingForm: FormGroup;
  bookingCount;
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
      this.viewScheduledBookingForm = this.fb.group({
        no: ['']
      });
    }
    newBookings() {
      this.showNewBooking = true;
      this.showConfirmBooking = false;
      this.showCancelBooking = false;
      this.showCompletedOrders = false;
      this.productionService.getScheduledBooking().subscribe(data => {
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
      this.productionService.approvedScheduledBooking().subscribe(data => {
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
      this.productionService.cancelledScheduledBooking().subscribe(data => {
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
      this.productionService.completedScheduledBooking().subscribe(data => {
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
      this.productionService.scheduledBookingApproval( id).subscribe(data => {
        this.bookingDetail = data;
        this.bookingCount = data.length;
      }, error => {
        console.log(error);
      });
      this.titleToSent =  'Model Booking Confirmed';
      this.sendNotification(mobileNumber, bookingID, this.titleToSent);
    }
    cancelledBookingApproval( id, bookingID, mobileNumber) {
      this.action = 'Aproved';
      this.message = bookingID ;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.productionService.approvalForCancelledScheduledBooking( id).subscribe(data => {
        this.bookingDetail = data;
        this.cancelCount = data.length;
      }, error => {
        console.log(error);
      });
      this.titleToSent =  'Model Booking Confirmed';
      this.sendNotification(mobileNumber, bookingID, this.titleToSent);
    }
    cancelBooking( id, bookingID) {
      this.action = 'Cancelled';
      this.message = bookingID ;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.productionService.scheduledBookingCancel( id).subscribe(data => {
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
      this.productionService.cancelNewScheduledBooking( id).subscribe(data => {
        this.bookingDetail = data;
        this.confirmCount = data.length;
      }, error => {
        console.log(error);
      });
    }
    updateStatus(no) {
      this.router.navigate(['/update', no]);
    }
    viewDetails(no) {
      this.productionService.getScheduledBookingDetails(no).subscribe(sample => {
        this.modelBooking = sample;
      }, error => {
        console.log(error);
      });
      const dialogRef = this.dialog.open(ScheduledBookingViewComponent, {
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
      templateUrl: './scheduled-booking-view.component.html'
    })
    export class ScheduledBookingViewComponent implements OnInit {
      viewScheduledDetailsForm: FormGroup;
      modelBooking: ScheduledBooking;
      constructor(private fb: FormBuilder, private productionService: ProductionMgmtService,
         public dialogRef: MatDialogRef<ScheduledBookingViewComponent>,
         @Inject(MAT_DIALOG_DATA) public data) {
           console.log(data);
      }
      cancel(): void {
        this.dialogRef.close();
      }
      ngOnInit() {
        this.createViewForm();
        this.viewModelBookingDetails();
      }
      createViewForm() {
        this.viewScheduledDetailsForm = this.fb.group({
          no: ['']
        });
      }
      viewModelBookingDetails() {
        this.productionService.getScheduledBookingDetails(this.data).subscribe(sample => {
          this.modelBooking = sample;
        }, error => {
          console.log(error);
        });
      }
    }
