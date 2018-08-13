import { Component, OnInit, Input } from '@angular/core';
import { SignIn } from './sign.model';
import { AccountService } from '../account.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import {ServiceProvider} from '../../account/registration/service-provider.model';
import {ModelManagementService} from '../../model-management/model-management.service';
import { Model } from '../../model-management/add-model/model.model';
import {ServiceProviders} from './sp.model';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  onAdminForm: FormGroup;
  userModel: SignIn;
  showError: Boolean;
  status;
  data;
  spModel: ServiceProvider;
  spDetail: ServiceProviders;
  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private accountService: AccountService, private modelService: ModelManagementService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.onAdminForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  adminSubmit(onAdminForm: FormGroup, name: any, pwd: any) {
    this.userModel = new SignIn(
      onAdminForm.controls.userName.value,
      onAdminForm.controls.password.value,
    );

    this.accountService.signIn(this.userModel).subscribe(data => {
      console.log(data);
      if (data === false) { // admin
        this.router.navigate(['/navheader', data]);
      } else if (data === true) { // sp
    this.spValidate(name, pwd);
      }
    }, error => {
      console.log(error);
    });
  }
spValidate(name, pwd) { // check sp is approved or not
  this.userModel = new SignIn(name, pwd);
  this.accountService.validate(this.userModel).subscribe(data => {
    console.log(data);
    this.localStorageService.store('userName', data.userName);
 this.localStorageService.store('companyName', data.companyName);
 this.localStorageService.store('Id', data.Id);
    /* this.modelService.spDetail(data); */
  this.spModel = data;
    if (data == null) {
this.showError = true;
    } else  {
this.status = false;
this.router.navigate(['/navheader', true]);
    }
  }, error => {
    console.log(error);
  });
}
}