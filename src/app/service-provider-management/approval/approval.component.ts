import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {ServiceProviderService} from '../service-provider.service';
import {SProviders} from './serviceProvider.model';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
Detail: SProviders;
approvalForm: FormGroup;
show: boolean;
  constructor(private fb: FormBuilder, private router: Router, private spService: ServiceProviderService) { }

  ngOnInit() {
    this.unapprovedServiceProviders();
    this.createForm();
  }
  createForm() {
    this.approvalForm = this.fb.group({
      id: ['']
    });
  }
unapprovedServiceProviders() {
  this.show = true;
  this.spService.findServiceProvider().subscribe( data => {
    this.Detail = data;
    console.log(data);
  });
}
approvedServiceProviders() {
  this.show = false;
  this.spService.approved().subscribe( data => {
    this.Detail = data;
    console.log(data);
  });
}
approve(viewBookingForm: FormGroup, no: any) {
  this.spService.giveApproval(no).subscribe( data => {
   /*  this.Detail = data; */
    console.log(data);
  });
}
}
