import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProductionMgmtService } from '../production-mgmt.service';
import { BookingDetail } from './product-booking.model';
import {Booking} from '../../shared/bookings.model';
import {NavheaderService} from '../../nav-header/nav-header.service';

@Component({
  selector: 'app-product-booking',
  templateUrl: './product-booking.component.html',
  styleUrls: ['./product-booking.component.css']
})
export class ProductBookingComponent implements OnInit {
  bookingDetail: Booking[] = [];
  viewBookingForm: FormGroup;
  bookingCount;
  bookingData: BookingDetail;
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
    this.viewBookingForm = this.fb.group({
      no: ['']
    });
  }
newBookings() {
  this.showNewBooking = true;
  this.showConfirmBooking = false;
  this.showCancelBooking = false;
  this.showCompletedOrders = false;
  this.productionService.getProductBooking().subscribe(data => {
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
  this.productionService.approvedProductBooking().subscribe(data => {
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
  this.productionService.cancelledProductBooking().subscribe(data => {
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
  this.productionService.completedProductBooking().subscribe(data => {
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
  this.productionService.bookingApproval( id).subscribe(data => {
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
  this.productionService.bookingApprovalForCancelledBooking( id).subscribe(data => {
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
  this.productionService.bookingCancel( id).subscribe(data => {
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
  this.productionService.cancelNewBooking( id).subscribe(data => {
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
    this.bookingData = sample;
  }, error => {
    console.log(error);
  });
  const dialogRef = this.dialog.open(ProductBookingViewComponent, {
    width: '1020px',
    disableClose: true,
    data: no
  });
  dialogRef.afterClosed();
}
}

@Component({
  templateUrl: './product-booking-view.component.html'
})
export class ProductBookingViewComponent implements OnInit {
  viewProductDetailsForm: FormGroup;
  bookingData: BookingDetail;
  constructor(private fb: FormBuilder, private productionService: ProductionMgmtService,
     public dialogRef: MatDialogRef<ProductBookingViewComponent>,
     @Inject(MAT_DIALOG_DATA) public data) {
       console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createViewForm();
    this.viewProductBookingDetails();
  }

  createViewForm() {
    this.viewProductDetailsForm = this.fb.group({
      no: ['']
    });
  }
  viewProductBookingDetails() {
    this.productionService.getProductBookingDetails(this.data).subscribe(sample => {
      this.bookingData = sample;
      console.log(this.bookingData);
    }, error => {
      console.log(error);
    });
  }
}
