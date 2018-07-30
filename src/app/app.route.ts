import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SiginComponent } from './account/sigin/sigin.component';
import { ViewBookingComponent } from './booking-details/view-booking/view-booking.component';
import {UpdateStatusComponent } from './booking-details/update-status/update-status.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent},
    { path: 'signIn', component: SiginComponent },
    { path: 'details', component: ViewBookingComponent },
    { path: 'update/:no', component: UpdateStatusComponent },
    { path: '', redirectTo: 'signIn', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
