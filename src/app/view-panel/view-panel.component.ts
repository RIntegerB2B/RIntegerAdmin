import { Component, OnInit } from '@angular/core';
import { ViewPanelService } from './view-panel.service';
import { BookingDetail } from './../booking-details/view-booking/booking-detail.model';
import { LeadModel } from './new-panel/lead.model';
import { mobileNumber } from '../account/registration/validation';
import { MatTableDataSource } from '@angular/material';
import { AllBooking } from './../AllBooking/bookings.model';
@Component({
  selector: 'app-view-panel',
  templateUrl: './view-panel.component.html',
  styleUrls: ['./view-panel.component.css']
})
export class ViewPanelComponent implements OnInit {
  holder: BookingDetail;
  bookeddetails;
  leaddetails: LeadModel;
  bookfields: LeadModel;
  allbooking: AllBooking;
  BookingApproved = false;
  BookingCancelled = false;
  displayedColumns: string[] = ['bookingDate', 'name', 'mobileNumber', 'bookingType', 'bookingOrderId', 'approve', 'Cancel'];
  constructor(private vps: ViewPanelService, ) {

  }

  ngOnInit() {
    this.getingBookingdetails();
  }
  getingBookingdetails() {
    this.vps.getBookingdetails().subscribe(data => {
      this.bookeddetails = data;
      this.bookeddetails = new MatTableDataSource<BookingDetail>(data);
      this.bookeddetails = data;
      console.log(this.bookeddetails);
    });
  }

  onApproved(book, bookingType, bookfields) {
    this.BookingApproved = true;
    this.bookeddetails = new BookingDetail();
    this.bookeddetails.bookingType = bookingType;
    this.vps.getUpdateBookingapprove(book, this.bookeddetails).subscribe(data => {
      this.bookeddetails = data;
      this.onLead(bookfields);
    }, error => {
      console.log(error);
    });
  }
  onLead(bookfields) {
    this.leaddetails = new LeadModel();
    this.leaddetails.name = bookfields.name;
    this.leaddetails.mobileNumber = bookfields.mobileNumber;
    this.leaddetails.bookingDate = bookfields.bookingDate;
    this.leaddetails.emailId = bookfields.emailId;
    this.vps.getapprovedtolead(this.leaddetails).subscribe(data => {
      this.leaddetails = data;
    }, error => {
      console.log(error);
    });
  }

  onCancelled(book, bookingType) {
    this.BookingCancelled = true;
    this.bookeddetails = new BookingDetail();
    this.bookeddetails.bookingType = bookingType;
    this.vps.getUpdateBookingcancel(book, this.bookeddetails).subscribe(data => {
      this.bookeddetails = data;
    }, error => {
      console.log(error);
    });
  }

}