import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Booking} from '../shared/bookings.model';
import {NavheaderService} from '../nav-header/nav-header.service';

import {Subscribe} from './subscribe.model';
import { LocalStorageService } from 'ngx-webstorage';
import {SubscribeService} from './subscribe.service';
import {mobileNumber} from './mobileNumber';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  subscribeModel: Subscribe;
  mobNum: number;
  mobNo;
  mobileNo;
  subscribeForm: FormGroup;
  readonly VAPID_PUBLIC_KEY = 'BEe66AvTCe_qowysFNV2QsGWzgEDnUWAJq1ytVSXxtwqjcf0bnc6d5USXmZOnIu6glj1BFcj87jIR5eqF2WJFEY';
  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router,
    private navheaderService: NavheaderService,
    private swUpdate: SwUpdate, private swPush: SwPush, private subscribeService: SubscribeService) { }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
  }
  createForm() {
    this.subscribeForm = this.fb.group({
      mobileNumber: [ mobileNumber]
    });
  }

  subscribe(subscribeForm: FormGroup, mobileNo: any) {
    this. mobNo  = mobileNo;
    this.router.navigate(['/navheader', true]);
     this.swPush.requestSubscription({
       serverPublicKey: this.VAPID_PUBLIC_KEY
     })
       .then(sub => {
         this.subscribeModel = new Subscribe();
         this.subscribeModel.user = 'serviceProvider';
         this.subscribeModel.userSubscriptions = sub;
         this.subscribeModel.mobileNumber = this.mobNo;
         this.subscribeService.addPushSubscriber(this.subscribeModel).subscribe();
       })
       .catch(err => console.error('Could not subscribe to notifications', err));
   }

}
