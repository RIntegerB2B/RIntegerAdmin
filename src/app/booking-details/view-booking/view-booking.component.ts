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
  showModelBooking: Boolean;
  showDirectBooking: Boolean;
  showRegistrationBooking: Boolean;
  showCatalogBooking: Boolean;
  showMarketingBooking: Boolean;
  showCancelBooking: Boolean;
  showApprovedBooking: Boolean;
  showCreativeBooking: Boolean;
  showEditingBooking: Boolean;
  constructor(private fb: FormBuilder, private router: Router, private bookingService: BookingDetailsService) { }

  ngOnInit() {
   //  this.getDetails();
    this.createForm();
   this.approved();
  }
  createForm() {
    this.viewBookingForm = this.fb.group({
      no: ['']
    });
  }
  cancelled() {
    this.bookingService.cancelledbooking().subscribe(data => {
      this.bookingDetail = data;
      this.showCancelBooking =  true;
      this.showDirectBooking = false;
      this.showModelBooking = false;
      this.showApprovedBooking = false;
      this.showRegistrationBooking = false;
      this.showMarketingBooking = false;
      this.showCatalogBooking = false;
      this.showCreativeBooking = false;
      this.showEditingBooking = false;

    }, error => {
      console.log(error);
     } );
  }
  giveApproval(mobileNumber, id) {
    this.bookingService.bookingApproval(mobileNumber, id).subscribe(data => {
    console.log(data);
    }, error => {
      console.log(error);
    });
  }
  cancel(num: any, Id: any) {
    this.bookingService.cancelBooking(num, Id).subscribe(data => {
    });
    }
  approved() {
     this.bookingService.approvedbooking().subscribe( data => {
       this.bookingDetail = data;
       this.showCancelBooking = false ;
      this.showDirectBooking = false;
      this.showModelBooking = false;
      this.showApprovedBooking = true;
      this.showRegistrationBooking = false;
      this.showMarketingBooking = false;
      this.showCatalogBooking = false;
      this.showCreativeBooking = false;
      this.showEditingBooking = false;

     }, error => {
       console.log(error);
      } );
  }
  getDetails() {
    this.bookingService.getbookingDetails().subscribe(data => {
      this.bookingDetail = data;
      console.log(this.bookingDetail);
    }, error => {
      console.log(error);
    });
  }
modelBooking() {
  this.showModelBooking = true;
  this.showDirectBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = false;
  this.showMarketingBooking = false;
  this.showCatalogBooking = false;
  this.showCreativeBooking = false;
      this.showEditingBooking = false;
  this.bookingService.getModelBookingDetails().subscribe(data => {
    this.bookingDetail = data;
  }, error => {
    console.log(error);
  });
}
directBooking() {
  this.showDirectBooking = true;
  this.showModelBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = false;
  this.showMarketingBooking = false;
  this.showCatalogBooking = false;
  this.showCreativeBooking = false;
      this.showEditingBooking = false;
  this.bookingService.getDirectBookingDetails().subscribe(data => {
    this.bookingDetail = data;
    console.log(this.bookingDetail);
  }, error => {
    console.log(error);
  });
}
catalogBooking() {
  this.showDirectBooking = false;
  this.showModelBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = false;
  this.showMarketingBooking = false;
  this.showCatalogBooking = true;
  this.showCreativeBooking = false;
      this.showEditingBooking = false;
  this.bookingService.getCatalogBookingDetails().subscribe(data => {
    this.bookingDetail = data;
    console.log(this.bookingDetail);
  }, error => {
    console.log(error);
  });
}
registrationBooking() {
  this.showDirectBooking = false;
  this.showModelBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = true;
  this.showMarketingBooking = false;
  this.showCatalogBooking = false;
  this.showCreativeBooking = false;
      this.showEditingBooking = false;
  this.bookingService.getRegistrationBookingDetails().subscribe(data => {
    this.bookingDetail = data;
    console.log(this.bookingDetail);
  }, error => {
    console.log(error);
  });
}
marketingBooking() {
  this.showDirectBooking = false;
  this.showModelBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = false;
  this.showMarketingBooking = true;
  this.showCatalogBooking = false;
  this.showCreativeBooking = false;
      this.showEditingBooking = false;
  this.bookingService.getMarketingBookingDetails().subscribe(data => {
    this.bookingDetail = data;
    console.log(this.bookingDetail);
  }, error => {
    console.log(error);
  });
}
creativeBooking() {
  this.showDirectBooking = false;
  this.showModelBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = false;
  this.showMarketingBooking = false;
  this.showCatalogBooking = false;
  this.showCreativeBooking = true;
      this.showEditingBooking = false;
  this.bookingService.getCreativeBookingDetails().subscribe(data => {
    this.bookingDetail = data;
    console.log(this.bookingDetail);
  }, error => {
    console.log(error);
  });
}
editingBooking() {
  this.showDirectBooking = false;
  this.showModelBooking = false;
  this.showCancelBooking = false ;
  this.showApprovedBooking = false;
  this.showRegistrationBooking = false;
  this.showMarketingBooking = false;
  this.showCatalogBooking = false;
  this.showCreativeBooking = false;
      this.showEditingBooking = true;
  this.bookingService.getEditingBookingDetails().subscribe(data => {
    this.bookingDetail = data;
    console.log(this.bookingDetail);
  }, error => {
    console.log(error);
  });
}
  statusView(viewBookingForm: FormGroup, no: any, bookingtype) {
    console.log(bookingtype);
    this.router.navigate(['/update', no]);
    if (bookingtype === 'Editing Booking') {
      this.router.navigate(['/editingstatus', no]);
    }
  }

}
