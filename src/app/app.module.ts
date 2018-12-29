import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app.route';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import {
  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationComponent } from './account/registration/registration.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { ApprovalComponent } from './service-provider-management/approval/approval.component';
import { AddModelComponent } from './model-management/add-model/add-model.component';
import { ViewModelComponent,
  ScheduledComponent, ScheduledLocationComponent } from './model-management/view-model/view-model.component';

import { ModelManagementService } from './model-management/model-management.service';
import { PushNotificationComponent } from './notification/push-notification/push-notification.component';
import { NotificationService } from './notification/notification.service';
import { CustomerDetailsComponent } from './customer-management/customer-details/customer-details.component';
import { ApproveAgencyComponent } from './agency-management/approve-agency/approve-agency.component';
import { ViewAgencyComponent } from './agency-management/view-agency/view-agency.component';
import { ViewDirectModelComponent } from './direct-model-management/view-direct-model/view-direct-model.component';
import { ApproveDirectModelComponent } from './direct-model-management/approve-direct-model/approve-direct-model.component';
import { ImageManagementComponent } from './model-management/image-management/image-management.component';
import { ViewProfileComponent } from './model-management/view-profile/view-profile.component';
import { CatalogListingComponent } from './catalog-listing-settings/catalog-listing/catalog-listing.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UpdateEditingStatusComponent } from './booking-details/update-editing-status/update-editing-status.component';
import { UpdateCreativeStatusComponent } from './booking-details/update-creative-status/update-creative-status.component';
import { UpdateCatalogingStatusComponent } from './booking-details/update-cataloging-status/update-cataloging-status.component';
import { UpdateRegistartionStatusComponent } from './booking-details/update-registartion-status/update-registartion-status.component';
import { UpdateAplusStatusComponent } from './booking-details/update-aplus-status/update-aplus-status.component';
import { AuthGuard } from './shared/auth.service';
import { NavheaderService } from './nav-header/nav-header.service';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatRadioModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatStepperModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { ProductBookingComponent, ProductBookingViewComponent } from './production-mgmt/product-booking/product-booking.component';
import { ModelBookingComponent, ModelBookingViewComponent } from './production-mgmt/model-booking/model-booking.component';
import { MatBadgeModule } from '@angular/material/badge';
import {
  ImageEditingBookingComponent,
  EditingBookingViewComponent
} from './production-mgmt/image-editing-booking/image-editing-booking.component';
import { CreativeBookingComponent, CreativeBookingViewComponent } from './production-mgmt/creative-booking/creative-booking.component';
import {
  RegistrationSetupBookingComponent,
  RegistrationBookingViewComponent
} from './marketing-management/registration-setup-booking/registration-setup-booking.component';
import {
  DigitalMgmtBookingComponent,
  DigitalMgmtViewComponent
} from './marketing-management/digital-mgmt-booking/digital-mgmt-booking.component';
import { MonthlyPlanComponent } from './digital-management/monthly-plan/monthly-plan.component';
import {
  MarketingServicesComponent,
  MarketingServicesViewComponent
} from './marketing-management/marketing-services/marketing-services.component';
import {
  AplusCatalogingComponent,
  AplusBookingViewComponent
} from './marketing-management/aplus-cataloging/aplus-cataloging.component';
import {
  CatalogingListingComponent,
  CatalogingViewComponent
} from './marketing-management/cataloging-listing/cataloging-listing.component';
import {
  ItServicesBookingComponent,
  ITServicesViewComponent
} from './it-services-management/it-services-booking/it-services-booking.component';
import {
  ScheduledModelBookingComponent,
  ScheduledBookingViewComponent,
} from './production-mgmt/scheduled-model-booking/scheduled-model-booking.component';
import { MarketingManagementComponent, MarketingAddComponent,
   MarketingEditComponent } from './crm/marketing-management/marketing-management/marketing-management.component';
import { UploadManagementComponent,  } from './crm/upload-management/upload-management/upload-management.component';
import { CustomerManagementComponent, CustomerAddComponent,
  CustomerEditComponent } from './crm/customer-management/customer-management/customer-management.component';
import { WhatsappManagementComponent } from './whatsapp/whatsapp-management/whatsapp-management.component';
import { PermissionComponent } from './user-management/permission/permission/permission.component';
import { RegisterComponent } from './user-management/register/register.component';
import {ContactUsComponent} from './contact/contact-us/contact-us.component';
import {SubscribeCustomerComponent} from './crm/customer-management/subscribe-customer/subscribe-customer.component';
import { AnalysisComponent } from './crm/data-analysis/analysis/analysis.component';
import { NotSubscribedComponent } from './crm/data-analysis/not-subscribed/not-subscribed.component';
import { SuperCategoryComponent } from './our-work/super-category/super-category.component';
import { MainCategoryComponent } from './our-work/main-category/main-category.component';
import { AddImagesComponent } from './our-work/add-images/add-images.component';
import { ViewImagesComponent } from './our-work/view-images/view-images.component';
import { MultipleImagesComponent } from './our-work/multiple-images/multiple-images.component';
import { ViewMultipleImagesComponent } from './our-work/view-multiple-images/view-multiple-images.component';
import {BannerComponent} from './settings/banner/banner.component';
import { SuperCategoryVideoComponent } from './video-portfolio/super-category-video/super-category-video.component';
import { MainCategoryVideoComponent } from './video-portfolio/main-category-video/main-category-video.component';
import { AddVideosComponent } from './video-portfolio/add-videos/add-videos.component';
import { ViewVideosComponent } from './video-portfolio/view-videos/view-videos.component';
import {SafePipe} from './shared/safe.pipe';
import { AdsComponent } from './settings/ads/ads.component';

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
    AddModelComponent,
    ViewModelComponent,
    PushNotificationComponent,
    CustomerDetailsComponent,
    ApproveAgencyComponent,
    ViewAgencyComponent,
    ViewDirectModelComponent,
    ApproveDirectModelComponent,
    ImageManagementComponent,
    ViewProfileComponent,
    CatalogListingComponent,
    SubscribeComponent,
    UpdateEditingStatusComponent,
    UpdateCreativeStatusComponent,
    UpdateCatalogingStatusComponent,
    UpdateRegistartionStatusComponent,
    UpdateAplusStatusComponent,
    ProductBookingComponent,
    ModelBookingComponent,
    ProductBookingViewComponent,
    ModelBookingViewComponent,
    ImageEditingBookingComponent,
    EditingBookingViewComponent,
    CreativeBookingComponent,
    CreativeBookingViewComponent,
    RegistrationSetupBookingComponent,
    RegistrationBookingViewComponent,
    DigitalMgmtBookingComponent,
    DigitalMgmtViewComponent,
    MonthlyPlanComponent,
    MarketingServicesComponent,
    AplusCatalogingComponent,
    AplusBookingViewComponent,
    CatalogingListingComponent,
    CatalogingViewComponent,
    MarketingServicesViewComponent,
    ItServicesBookingComponent,
    ITServicesViewComponent,
    ScheduledModelBookingComponent,
    ScheduledBookingViewComponent,
    MarketingManagementComponent,
    MarketingAddComponent,
    MarketingEditComponent,
    UploadManagementComponent,
    CustomerManagementComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    WhatsappManagementComponent,
    PermissionComponent,
    RegisterComponent,
    ContactUsComponent,
    ScheduledComponent,
    SubscribeCustomerComponent,
    AnalysisComponent,
    NotSubscribedComponent,
    ScheduledLocationComponent,
    SuperCategoryComponent,
    MainCategoryComponent,
    AddImagesComponent,
    ViewImagesComponent,
    MultipleImagesComponent,
    ViewMultipleImagesComponent,
    BannerComponent,
    ScheduledLocationComponent,
    SuperCategoryVideoComponent,
    MainCategoryVideoComponent,
    AddVideosComponent,
    ViewVideosComponent,
    SafePipe,
    AdsComponent
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
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatRadioModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatStepperModule,
    NgxDatatableModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AccountService, BookingDetailsService, NavheaderService,
    ModelManagementService, LocalStorageService, NotificationService, AuthGuard],
  entryComponents: [ProductBookingViewComponent, ModelBookingViewComponent, EditingBookingViewComponent,
    CreativeBookingViewComponent, MarketingEditComponent, MarketingAddComponent, RegistrationBookingViewComponent, ITServicesViewComponent,
    MarketingServicesViewComponent, DigitalMgmtViewComponent, CatalogingViewComponent,
    CustomerAddComponent, CustomerEditComponent,
    AplusBookingViewComponent, ScheduledBookingViewComponent, ScheduledComponent,  ScheduledLocationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
