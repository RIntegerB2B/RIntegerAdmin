import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app.route';


import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ng2Webstorage, LocalStorageService } from 'ngx-webstorage';
import { AccountService } from './account/account.service';

import { BookingDetailsService } from './booking-details/booking-details.service';
import { AppComponent } from './app.component';
import { SiginComponent } from './account/sigin/sigin.component';
import { UpdateStatusComponent } from './booking-details/update-status/update-status.component';
import { ViewBookingComponent } from './booking-details/view-booking/view-booking.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatSelectModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationComponent } from './account/registration/registration.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { ApprovalComponent } from './service-provider-management/approval/approval.component';
import { ApproveModelComponent } from './model-management/approve-model/approve-model.component';
import { AddModelComponent } from './model-management/add-model/add-model.component';
import { ViewModelComponent } from './model-management/view-model/view-model.component';
import {ModelManagementService} from './model-management/model-management.service';


@NgModule({
  declarations: [
    AppComponent,
    SiginComponent,
    UpdateStatusComponent,
    ViewBookingComponent,
    WelcomeComponent,
    RegistrationComponent,
    NavHeaderComponent,
    ApprovalComponent,
    ApproveModelComponent,
    AddModelComponent,
    ViewModelComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AccountService, BookingDetailsService,
     ModelManagementService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
