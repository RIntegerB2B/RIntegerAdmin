import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SiginComponent } from './account/sigin/sigin.component';
import { ViewBookingComponent } from './booking-details/view-booking/view-booking.component';
import { UpdateStatusComponent } from './booking-details/update-status/update-status.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { ApprovalComponent } from './service-provider-management/approval/approval.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { AddModelComponent } from './model-management/add-model/add-model.component';
import {
    ViewModelComponent,
    ScheduledComponent
} from './model-management/view-model/view-model.component';
import { PushNotificationComponent } from './notification/push-notification/push-notification.component';
import { CustomerDetailsComponent } from './customer-management/customer-details/customer-details.component';
import { ViewAgencyComponent } from './agency-management/view-agency/view-agency.component';
import { ImageManagementComponent } from './model-management/image-management/image-management.component';
import { ViewProfileComponent } from './model-management/view-profile/view-profile.component';
import { CatalogListingComponent } from './catalog-listing-settings/catalog-listing/catalog-listing.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UpdateEditingStatusComponent } from './booking-details/update-editing-status/update-editing-status.component';
import { UpdateCreativeStatusComponent } from './booking-details/update-creative-status/update-creative-status.component';
import { UpdateCatalogingStatusComponent } from './booking-details/update-cataloging-status/update-cataloging-status.component';
import { UpdateRegistartionStatusComponent } from './booking-details/update-registartion-status/update-registartion-status.component';
import { UpdateAplusStatusComponent } from './booking-details/update-aplus-status/update-aplus-status.component';
import { AuthGuard } from './shared/auth-guard-service/auth.service';
import { ProductBookingComponent } from './production-mgmt/product-booking/product-booking.component';
import { ModelBookingComponent } from './production-mgmt/model-booking/model-booking.component';
import { ImageEditingBookingComponent } from './production-mgmt/image-editing-booking/image-editing-booking.component';
import { CreativeBookingComponent } from './production-mgmt/creative-booking/creative-booking.component';
import {
    RegistrationBookingViewComponent,
    RegistrationSetupBookingComponent
} from './marketing-management/registration-setup-booking/registration-setup-booking.component';
import {
    DigitalMgmtBookingComponent,
    DigitalMgmtViewComponent
} from './marketing-management/digital-mgmt-booking/digital-mgmt-booking.component';
import { MonthlyPlanComponent } from './digital-management/monthly-plan/monthly-plan.component';
import {
    AplusCatalogingComponent,
    AplusBookingViewComponent
} from './marketing-management/aplus-cataloging/aplus-cataloging.component';
import {
    CatalogingListingComponent,
    CatalogingViewComponent
} from './marketing-management/cataloging-listing/cataloging-listing.component';
import {
    MarketingServicesComponent,
    MarketingServicesViewComponent
} from './marketing-management/marketing-services/marketing-services.component';
import {
    ItServicesBookingComponent,
    ITServicesViewComponent
} from './it-services-management/it-services-booking/it-services-booking.component';
import {
    ScheduledModelBookingComponent,
    ScheduledBookingViewComponent
} from './production-mgmt/scheduled-model-booking/scheduled-model-booking.component';
import { MarketingManagementComponent } from './crm/marketing-management/marketing-management/marketing-management.component';
import { UploadManagementComponent } from './crm/upload-management/upload-management/upload-management.component';
import {
    CustomerManagementComponent, CustomerAddComponent,
    CustomerEditComponent
} from './crm/customer-management/customer-management/customer-management.component';
import { WhatsappManagementComponent } from './whatsapp/whatsapp-management/whatsapp-management.component';
import { PermissionComponent } from './user-management/permission/permission/permission.component';
import { RegisterComponent } from './user-management/register/register.component';
import { ContactUsComponent } from './contact/contact-us/contact-us.component';
import { SubscribeCustomerComponent } from './crm/customer-management/subscribe-customer/subscribe-customer.component';
import { AnalysisComponent } from './crm/data-analysis/analysis/analysis.component';
import { NotSubscribedComponent } from './crm/data-analysis/not-subscribed/not-subscribed.component';
import { SuperCategoryComponent } from './our-work/super-category/super-category.component';
import { MainCategoryComponent } from './our-work/main-category/main-category.component';
import { AddImagesComponent } from './our-work/add-images/add-images.component';
import { ViewImagesComponent } from './our-work/view-images/view-images.component';
import { MultipleImagesComponent } from './our-work/multiple-images/multiple-images.component';
import { ViewMultipleImagesComponent } from './our-work/view-multiple-images/view-multiple-images.component';
import { BannerComponent } from './settings/banner/banner.component';
import { AddVideosComponent } from './video-portfolio/add-videos/add-videos.component';
import { MainCategoryVideoComponent } from './video-portfolio/main-category-video/main-category-video.component';
import { SuperCategoryVideoComponent } from './video-portfolio/super-category-video/super-category-video.component';
import { ViewVideosComponent } from './video-portfolio/view-videos/view-videos.component';
import { AdsComponent } from './settings/ads/ads.component';
import { ViewPanelComponent } from './view-panel/view-panel.component';
import { AllBookingComponent } from './AllBooking/all-booking/all-booking.component';
import { ApprovedbookingComponent } from './AllBooking/approvedbooking/approvedbooking.component';
import { CancelledBoookingComponent } from './AllBooking/cancelled-boooking/cancelled-boooking.component';
import { NewPanelComponent } from './view-panel/new-panel/new-panel.component';

const routes: Routes = [
    {
        path: 'signin', component: SiginComponent
    },
    { path: 'userpermission', component: PermissionComponent },
    { path: 'registration', component: RegistrationComponent },


    {
        path: 'navheader', canActivate: [AuthGuard], component: NavHeaderComponent,
        children: [
            { path: 'welcome', component: WelcomeComponent },
            { path: 'subscribe', canActivate: [AuthGuard], component: SubscribeComponent },
            { path: 'details', canActivate: [AuthGuard], component: ViewBookingComponent },
            { path: 'update/:no', canActivate: [AuthGuard], component: UpdateStatusComponent },
            { path: 'editingstatus/:no', canActivate: [AuthGuard], component: UpdateEditingStatusComponent },
            { path: 'creativestatus/:no', canActivate: [AuthGuard], component: UpdateCreativeStatusComponent },
            { path: 'catalogstatus/:no', canActivate: [AuthGuard], component: UpdateCatalogingStatusComponent },
            { path: 'registrationstatus/:no', canActivate: [AuthGuard], component: UpdateRegistartionStatusComponent },
            { path: 'aplusstatus/:no', canActivate: [AuthGuard], component: UpdateAplusStatusComponent },
            { path: 'serviceproviderapproval', canActivate: [AuthGuard], component: ApprovalComponent },
            { path: 'agency', canActivate: [AuthGuard], component: ViewAgencyComponent },
            { path: 'models', canActivate: [AuthGuard], component: ViewModelComponent },
            { path: 'model', canActivate: [AuthGuard], component: AddModelComponent },
            { path: 'model/:id', canActivate: [AuthGuard], component: AddModelComponent },
            { path: 'pushNotification', canActivate: [AuthGuard], component: PushNotificationComponent },
            { path: 'model/:id/name/:name', canActivate: [AuthGuard], component: ImageManagementComponent },
            { path: 'customers', canActivate: [AuthGuard], component: CustomerDetailsComponent },
            { path: 'profile/:name/images/:id', canActivate: [AuthGuard], component: ViewProfileComponent },
            { path: 'catalog', canActivate: [AuthGuard], component: CatalogListingComponent },
            { path: 'productbooking', canActivate: [AuthGuard], component: ProductBookingComponent },
            { path: 'modelbooking', canActivate: [AuthGuard], component: ModelBookingComponent },
            { path: 'imageeditingbooking', canActivate: [AuthGuard], component: ImageEditingBookingComponent },
            { path: 'creativebooking', canActivate: [AuthGuard], component: CreativeBookingComponent },
            { path: 'registrationbooking', canActivate: [AuthGuard], component: RegistrationSetupBookingComponent },
            { path: 'digitalmgmtbooking', canActivate: [AuthGuard], component: DigitalMgmtBookingComponent },
            { path: 'monthlyplan/:no/num/:mobileno', canActivate: [AuthGuard], component: MonthlyPlanComponent },
            { path: 'aplusbooking', canActivate: [AuthGuard], component: AplusCatalogingComponent },
            { path: 'cataloging', canActivate: [AuthGuard], component: CatalogingListingComponent },
            { path: 'marketing', canActivate: [AuthGuard], component: MarketingServicesComponent },
            { path: 'itservices', canActivate: [AuthGuard], component: ItServicesBookingComponent },
            { path: 'scheduledmodel', canActivate: [AuthGuard], component: ScheduledModelBookingComponent },
            { path: 'crmmarket', canActivate: [AuthGuard], component: MarketingManagementComponent },
            { path: 'crmcustomer', canActivate: [AuthGuard], component: CustomerManagementComponent },
            { path: 'crmupload', canActivate: [AuthGuard], component: UploadManagementComponent },
            { path: 'whatsapp', canActivate: [AuthGuard], component: WhatsappManagementComponent },

            {
                path: 'newpanel', component: NewPanelComponent,
                children: [{ path: 'viewpanel', component: ViewPanelComponent },
                { path: 'allbooking', component: AllBookingComponent },
                { path: 'approved', component: ApprovedbookingComponent },
                { path: 'cancelled', component: CancelledBoookingComponent }]
            },




            { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
            { path: 'contact', canActivate: [AuthGuard], component: ContactUsComponent },
            { path: 'crmsubscribe', canActivate: [AuthGuard], component: SubscribeCustomerComponent },
            { path: 'analysis', canActivate: [AuthGuard], component: AnalysisComponent },
            { path: 'notsubscribed', canActivate: [AuthGuard], component: NotSubscribedComponent },
            { path: 'supercategory', canActivate: [AuthGuard], component: SuperCategoryComponent },
            { path: 'maincategory', canActivate: [AuthGuard], component: MainCategoryComponent },
            { path: 'addportfolio', canActivate: [AuthGuard], component: AddImagesComponent },
            { path: 'viewportfolio', canActivate: [AuthGuard], component: ViewImagesComponent },
            {
                path: 'addmultiple/:mainid/maincategory/:subcatid/category/:catid',
                canActivate: [AuthGuard], component: MultipleImagesComponent
            },
            {
                path: 'view/:mainid/main/:subcatid/cat/:catid/name/:name/subname/:sub',
                canActivate: [AuthGuard], component: ViewMultipleImagesComponent
            },
            { path: 'banner', component: BannerComponent },
            { path: 'videosupercategory', component: SuperCategoryVideoComponent },
            { path: 'videomaincategory', component: MainCategoryVideoComponent },
            { path: 'addvideo', component: AddVideosComponent },
            { path: 'viewvideo', component: ViewVideosComponent },
            { path: 'viewvideo', component: ViewVideosComponent },
            { path: 'adImages', component: AdsComponent }
        ]
    },
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: '**', redirectTo: 'signin', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
