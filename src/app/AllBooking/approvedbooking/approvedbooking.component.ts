import { Component, OnInit } from '@angular/core';
import {ApprovedbookingService} from './approvedbooking.service';
import {AllBooking} from './../bookings.model';
import {BookingDetail} from './../../booking-details/view-booking/booking-detail.model';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-approvedbooking',
  templateUrl: './approvedbooking.component.html',
  styleUrls: ['./approvedbooking.component.css']
})
export class ApprovedbookingComponent implements OnInit {
allbooking;
displayedColumns:string[]=['bookingDate','name','mobileNumber','bookingType','bookingOrderId','Cancel']; 
holder: BookingDetail;
bookeddetails: BookingDetail;
BookingApproved = false;
BookingCancelled = false;
  constructor(private abs:ApprovedbookingService) { }

  ngOnInit() {
    this.getApprovedBooking();
  } 
  getApprovedBooking() {
    this.abs.getApprovedBooking().subscribe(data => {
      this.allbooking = new MatTableDataSource<AllBooking>(data); 
      this.allbooking = data;
      console.log(this.allbooking);
     })
} 

onCancelled(book,bookingType){ 
  this.BookingCancelled = true;
  this.allbooking = new AllBooking();
  this.allbooking.bookingType = bookingType;
  this.abs.getUpdateBookingcancel(book, this.allbooking).subscribe(data =>{
   
    this.allbooking = data;
    console.log(this.allbooking);
  })
}


}

