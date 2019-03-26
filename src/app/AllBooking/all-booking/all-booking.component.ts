import { Component, OnInit } from '@angular/core';
import {AllBookingService} from './all-booking.service';
import {AllBooking} from './../bookings.model';
import {MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrls: ['./all-booking.component.css']
})
export class AllBookingComponent implements OnInit {
  allbooking ;
  p = 1;
 /*  dataSource: AllBooking; */
  displayedColumns: string[] = ['bookingDate', 'name', 'mobileNumber', 'bookingType','bookingOrderId',
  'bookingStatus'];

  constructor(private abs: AllBookingService ) { }

  ngOnInit() {
    this.getAllBooking();
  }

  getAllBooking() {
    this.abs.getAllBooking().subscribe(book => {
      this.allbooking = new MatTableDataSource<AllBooking>(book);
      this.allbooking = book;
     }, error => {
       console.log(error);
     });
  }


}
