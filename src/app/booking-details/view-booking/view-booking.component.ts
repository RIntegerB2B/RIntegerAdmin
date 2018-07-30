import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookingDetailsService } from '../../booking-details/booking-details.service';
import { BookingDetail } from './booking-detail.model';
@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  bookingDetail: BookingDetail;
  viewBookingForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private bookingService: BookingDetailsService) { }

  ngOnInit() {
    this.getDetails();
    this.createForm();
  }
  createForm() {
    this.viewBookingForm = this.fb.group({
      no: ['']
    });
  }
  getDetails() {
    this.bookingService.getbookingDetails().subscribe(data => {
      this.bookingDetail = data;
      console.log(this.bookingDetail);
    }, error => {
      console.log(error);
    });
  }

  statusView(viewBookingForm: FormGroup, no: any) {
    this.router.navigate(['/update', no]);
  }

}
