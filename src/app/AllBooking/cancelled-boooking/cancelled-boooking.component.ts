import { Component, OnInit } from '@angular/core';
import { CancelledbookingService } from './cancelledbooking.service';
import { AllBooking } from './../bookings.model';
import { from } from 'rxjs';
import { BookingDetail } from './../../booking-details/view-booking/booking-detail.model';
import { LeadModel } from './../../view-panel/new-panel/lead.model';
import { ViewPanelService } from './../../view-panel/view-panel.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cancelled-boooking',
  templateUrl: './cancelled-boooking.component.html',
  styleUrls: ['./cancelled-boooking.component.css']
})
export class CancelledBoookingComponent implements OnInit {

  allbooking;
  holder: BookingDetail;
  bookeddetails: BookingDetail;
  BookingApproved = false;
  BookingCancelled = false;
  leaddetails: LeadModel;
  bookfields: LeadModel;
  displayedColumns: string[] = ['bookingDate', 'name', 'mobileNumber', 'bookingType', 'bookingOrderId', 'approve'];
  constructor(private cbs: CancelledbookingService, private vps: ViewPanelService) { }

  ngOnInit() {
    this.getCancelledBooking();
  }
  getCancelledBooking() {
    this.cbs.getCancelledBooking().subscribe(data => {
      this.allbooking = new MatTableDataSource<AllBooking>(data);
      this.allbooking = data;
      console.log(this.allbooking);
    });
  }


  onApproved(book, bookingType, bookfields) {
    this.BookingApproved = true;
    this.allbooking = new AllBooking();
    this.allbooking.bookingType = bookingType;
    this.cbs.getUpdateBookingapprove(book, this.allbooking).subscribe(data => {
      this.allbooking = data;
      this.onLead(bookfields);
    });
  }

  onLead(bookfields) {
    this.leaddetails = new LeadModel();
    this.leaddetails.name = bookfields.name;
    this.leaddetails.mobileNumber = bookfields.mobileNumber;
    this.leaddetails.bookingDate = bookfields.bookingDate;
    this.vps.getapprovedtolead(this.leaddetails).subscribe(data => {
      this.leaddetails = data;
      console.log(this.leaddetails);
    });
  }

}

