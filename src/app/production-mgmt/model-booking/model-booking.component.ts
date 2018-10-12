import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProductionMgmtService } from '../production-mgmt.service';
import {Booking} from '../../shared/bookings.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
import {ModelBooking} from './model-booking.model';
import { BookingDetail } from '../../booking-details/view-booking/booking-detail.model';

@Component({
  selector: 'app-model-booking',
  templateUrl: './model-booking.component.html',
  styleUrls: ['./model-booking.component.css']
})
export class ModelBookingComponent implements OnInit {
modelBooking: ModelBooking;
  bookingDetail: Booking[] = [];
  viewModelBookingForm: FormGroup;
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
      this.confirmedBookings();
    }
    createForm() {
      this.viewModelBookingForm = this.fb.group({
        no: ['']
      });
    }
    newBookings() {
      this.showNewBooking = true;
      this.showConfirmBooking = false;
      this.showCancelBooking = false;
      this.showCompletedOrders = false;
      this.productionService.getModelBooking().subscribe(data => {
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
      this.productionService.approvedModelBooking().subscribe(data => {
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
      this.productionService.cancelledModelBooking().subscribe(data => {
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
      this.productionService.completedmodelbooking().subscribe(data => {
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
    giveApproval( id, bookingID) {
      this.action = 'Aproved';
      this.message = bookingID ;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.productionService.modelBookingApproval( id).subscribe(data => {
        this.bookingDetail = data;
        this.bookingCount = data.length;
      }, error => {
        console.log(error);
      });
    }
    cancelledBookingApproval( id, bookingID) {
      this.action = 'Aproved';
      this.message = bookingID ;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.productionService.approvalForCancelledModelBooking( id).subscribe(data => {
        this.bookingDetail = data;
        this.cancelCount = data.length;
      }, error => {
        console.log(error);
      });
    }
    cancelBooking( id, bookingID) {
      this.action = 'Cancelled';
      this.message = bookingID ;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.productionService.modelBookingCancel( id).subscribe(data => {
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
      this.productionService.cancelNewModelBooking( id).subscribe(data => {
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
      this.productionService.getProductBookingDetails(no).subscribe(sample => {
        this.modelBooking = sample;
      }, error => {
        console.log(error);
      });
      const dialogRef = this.dialog.open(ModelBookingViewComponent, {
        width: '1020px',
        disableClose: true,
        data: no
      });
      dialogRef.afterClosed();
    }
    }
    @Component({
      templateUrl: './model-booking-view.component.html'
    })
    export class ModelBookingViewComponent implements OnInit {
      viewModelDetailsForm: FormGroup;
      modelBooking: ModelBooking;
      constructor(private fb: FormBuilder, private productionService: ProductionMgmtService,
         public dialogRef: MatDialogRef<ModelBookingViewComponent>,
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
        this.viewModelDetailsForm = this.fb.group({
          no: ['']
        });
      }
      viewModelBookingDetails() {
        this.productionService.getModelBookingDetails(this.data).subscribe(sample => {
          this.modelBooking = sample;
          console.log(this.modelBooking);
        }, error => {
          console.log(error);
        });
      }
    }
