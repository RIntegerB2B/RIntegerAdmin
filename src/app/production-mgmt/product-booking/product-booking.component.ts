import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProductionMgmtService } from '../production-mgmt.service';
import { BookingDetail } from './product-booking.model';
import {NavheaderService} from '../../nav-header/nav-header.service';

@Component({
  selector: 'app-product-booking',
  templateUrl: './product-booking.component.html',
  styleUrls: ['./product-booking.component.css']
})
export class ProductBookingComponent implements OnInit {
  bookingDetail: BookingDetail;
  viewBookingForm: FormGroup;
  bookingCount;
  bookingData;
  constructor(private fb: FormBuilder, private router: Router, private productionService: ProductionMgmtService,
    private navheaderService: NavheaderService, private dialog: MatDialog) {
     }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
    this.newBookings();
  }
  createForm() {
    this.viewBookingForm = this.fb.group({
      no: ['']
    });
  }
newBookings() {
  this.productionService.getProductBooking().subscribe(data => {
    this.bookingCount = data.length;
    this.bookingDetail = data;
  }, error => {
    console.log(error);
  });
}
viewDetails(no) {
  this.productionService.getProductBookingDetails(no).subscribe(data => {
    this.bookingData = data;
  console.log(data);
  }, error => {
    console.log(error);
  });
  const dialogRef = this.dialog.open(ProductBookingViewComponent, {
    width: '720px',
    disableClose: true,
    data: this.bookingData
  });
  dialogRef.afterClosed();

}
}

@Component({
  templateUrl: './product-booking-view.component.html'
})
export class ProductBookingViewComponent implements OnInit {
  viewProductDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ProductBookingViewComponent>) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createViewForm();
  }

  createViewForm() {
    this.viewProductDetailsForm = this.fb.group({
    });
  }
}
