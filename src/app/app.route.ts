import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SiginComponent } from './account/sigin/sigin.component';
import { ViewBookingComponent } from './booking-details/view-booking/view-booking.component';
import { UpdateStatusComponent } from './booking-details/update-status/update-status.component';
import { RegistrationComponent} from './account/registration/registration.component';
import { ApprovalComponent } from './service-provider-management/approval/approval.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { AddModelComponent } from './model-management/add-model/add-model.component';
import { ViewModelComponent } from './model-management/view-model/view-model.component';
import { PushNotificationComponent } from './notification/push-notification/push-notification.component';
import { CustomerDetailsComponent } from './customer-management/customer-details/customer-details.component';
import {ViewAgencyComponent} from './agency-management/view-agency/view-agency.component';
import {ImageManagementComponent} from './model-management/image-management/image-management.component';
import {ViewProfileComponent} from './model-management/view-profile/view-profile.component';
import {CatalogListingComponent} from './catalog-listing-settings/catalog-listing/catalog-listing.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UpdateEditingStatusComponent } from './booking-details/update-editing-status/update-editing-status.component';
import { UpdateCreativeStatusComponent } from './booking-details/update-creative-status/update-creative-status.component';
import { UpdateCatalogingStatusComponent } from './booking-details/update-cataloging-status/update-cataloging-status.component';
import { UpdateRegistartionStatusComponent } from './booking-details/update-registartion-status/update-registartion-status.component';
import { UpdateAplusStatusComponent } from './booking-details/update-aplus-status/update-aplus-status.component';
import {AuthGuard} from './shared/auth.service';
import {ProductBookingComponent} from './production-mgmt/product-booking/product-booking.component';


const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent},
    { path: 'subscribe', canActivate: [AuthGuard], component: SubscribeComponent},
    { path: 'signIn', component: SiginComponent },
    { path: 'details', canActivate: [AuthGuard], component: ViewBookingComponent },
    { path: 'update/:no', canActivate: [AuthGuard], component: UpdateStatusComponent },
    { path: 'editingstatus/:no', canActivate: [AuthGuard], component: UpdateEditingStatusComponent},
    { path: 'creativestatus/:no', canActivate: [AuthGuard], component: UpdateCreativeStatusComponent},
    { path: 'catalogstatus/:no', canActivate: [AuthGuard], component: UpdateCatalogingStatusComponent },
    { path: 'registrationstatus/:no',  canActivate: [AuthGuard], component: UpdateRegistartionStatusComponent },
    { path: 'aplusstatus/:no', canActivate: [AuthGuard], component: UpdateAplusStatusComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'serviceproviderapproval', canActivate: [AuthGuard], component: ApprovalComponent},
    { path: 'agency', canActivate: [AuthGuard], component: ViewAgencyComponent},
    { path: 'navheader', canActivate: [AuthGuard], component: NavHeaderComponent},
    { path: 'models', canActivate: [AuthGuard], component:  ViewModelComponent},
    { path: 'model', canActivate: [AuthGuard], component: AddModelComponent},
    { path: 'model/:id', canActivate: [AuthGuard], component: AddModelComponent},
    { path: 'pushNotification', canActivate: [AuthGuard], component: PushNotificationComponent},
    { path: 'model/:id/name/:name', canActivate: [AuthGuard], component: ImageManagementComponent},
    { path: 'customers', canActivate: [AuthGuard], component: CustomerDetailsComponent},
    { path: 'profile/:name/images/:id', canActivate: [AuthGuard], component: ViewProfileComponent},
    { path: 'catalog', canActivate: [AuthGuard], component: CatalogListingComponent},
    { path: 'productbooking', canActivate: [AuthGuard], component: ProductBookingComponent},
    { path: '', redirectTo: 'signIn', pathMatch: 'full' },
    { path: '**', redirectTo: 'signIn', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
