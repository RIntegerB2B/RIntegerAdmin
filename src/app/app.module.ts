import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app.route';


import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AccountService } from './account/account.service';
import { BookingDetailsService } from './booking-details/booking-details.service';
import { AppComponent } from './app.component';
import { SiginComponent } from './account/sigin/sigin.component';
import { UpdateStatusComponent } from './booking-details/update-status/update-status.component';
import { ViewBookingComponent } from './booking-details/view-booking/view-booking.component';
import { WelcomeComponent } from './home/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    UpdateStatusComponent,
    ViewBookingComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AccountService, BookingDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
