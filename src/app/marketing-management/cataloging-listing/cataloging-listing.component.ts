import { Component, OnInit , Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import {Booking} from '../../shared/bookings.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
import {CatalogBooking} from './cataloging-listing.model';
import {MarketingMgmtService} from '../marketing-mgmt.service';
import {Notification} from '../../shared/notification.model';

@Component({
  selector: 'app-cataloging-listing',
  templateUrl: './cataloging-listing.component.html',
  styleUrls: ['./cataloging-listing.component.css']
})
export class CatalogingListingComponent implements OnInit {
  notificationBody: string;
  title: any;
  titleToSent: string;
  notificationModel: Notification;
  bookingDetail: Booking[] = [];
  viewCatalogingBookingForm: FormGroup;
  bookingCount;
  CatalogModel: CatalogBooking;
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
      this.viewCatalogingBookingForm = this.fb.group({
        no: ['']
      });
    }
  newBookings() {
    this.showNewBooking = true;
    this.showConfirmBooking = false;
    this.showCancelBooking = false;
    this.showCompletedOrders = false;
    this.marketMgmtService.getCatalogingBooking().subscribe(data => {
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
    this.marketMgmtService.approvedCatalogingBooking().subscribe(data => {
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
    this.marketMgmtService.cancelledCatalogBooking().subscribe(data => {
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
    this.marketMgmtService.completedCatalogBooking().subscribe(data => {
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
    this.marketMgmtService.catalogBookingApproval( id).subscribe(data => {
      this.bookingDetail = data;
      this.bookingCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Cataloging / Listing Booking  Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelledBookingApproval( id, bookingID, mobileNumber) {
    this.action = 'Aproved';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.approvalForCancelledCatalogBooking( id).subscribe(data => {
      this.bookingDetail = data;
      this.cancelCount = data.length;
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Cataloging / Listing Booking  Confirmed';
    this.sendNotification(mobileNumber, bookingID, this.titleToSent);
  }
  cancelBooking( id, bookingID) {
    this.action = 'Cancelled';
    this.message = bookingID ;
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    this.marketMgmtService.catalogBookingCancel( id).subscribe(data => {
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
    this.marketMgmtService.newCatalogBookingCancel( id).subscribe(data => {
      this.bookingDetail = data;
      this.confirmCount = data.length;
    }, error => {
      console.log(error);
    });
  }
  updateStatus(no) {
    this.router.navigate(['/catalogstatus', no]);
  }
  viewDetails(no) {
    this.marketMgmtService.getCatalogBookingDetails(no).subscribe(sample => {
      this.CatalogModel = sample;
    }, error => {
      console.log(error);
    });
    const dialogRef = this.dialog.open(CatalogingViewComponent, {
      width: '2020px',
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
    templateUrl: './cataloging-listing-view.component.html'
  })
  export class CatalogingViewComponent implements OnInit {
    viewCatalogingDetailsForm: FormGroup;
    CatalogModel: CatalogBooking;
    constructor(private fb: FormBuilder, private marketMgmtService: MarketingMgmtService,
       public dialogRef: MatDialogRef<CatalogingViewComponent>,
       @Inject(MAT_DIALOG_DATA) public data) {
         console.log(data);
    }
    cancel(): void {
      this.dialogRef.close();
    }
    ngOnInit() {
      this.createViewForm();
      this.viewAplusBookingDetails();
    }
    createViewForm() {
      this.viewCatalogingDetailsForm = this.fb.group({
        no: ['']
      });
    }
    viewAplusBookingDetails() {
      this.marketMgmtService.getCatalogBookingDetails(this.data).subscribe(sample => {
        this.CatalogModel = sample;
      }, error => {
        console.log(error);
      });
    }
  }

