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

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent},
    { path: 'signIn', component: SiginComponent },
    { path: 'details', component: ViewBookingComponent },
    { path: 'update/:no', component: UpdateStatusComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'serviceproviderapproval', component: ApprovalComponent},
    { path: 'agency', component: ViewAgencyComponent},
    { path: 'navheader/:data', component: NavHeaderComponent},
    { path: 'models', component: ViewModelComponent},
    { path: 'model', component: AddModelComponent},
    { path: 'model/:id', component: AddModelComponent},
    { path: 'pushNotification', component: PushNotificationComponent},
    { path: 'model/:id/name/:name', component: ImageManagementComponent},
    { path: 'customers', component: CustomerDetailsComponent},
    { path: 'profile/:name/images/:id', component: ViewProfileComponent},
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
