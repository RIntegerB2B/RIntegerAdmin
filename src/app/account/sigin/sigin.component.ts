import { Component, OnInit, Input } from '@angular/core';
import { SignIn } from './sign.model';
import { AccountService } from '../account.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import {User} from '../../account/registration/user.model';
import {ModelManagementService} from '../../model-management/model-management.service';
import { Model } from '../../model-management/add-model/model.model';
import {Users} from './user.model';
import {NavheaderService} from '../../nav-header/nav-header.service';
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
  spModel: User;
  userDetail: Users;
  showPasswordError: boolean;
  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private accountService: AccountService, private modelService: ModelManagementService, private navheaderService: NavheaderService ) { }

  ngOnInit() {
    this.navheaderService.hideMenuTransparent();
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
      if (data === null) {
        this.showPasswordError = true;
      } else {
        if (data.role === 'admin') { // admin
          this.localStorageService.store('role', 'admin');
          this.localStorageService.store('role', data);
          this.router.navigate(['/navheader']);
        } else if (data.role !== 'admin') { // sp
      this.spValidate(name, pwd);
        }
      }
    }, error => {
      console.log(error);
    });
  }
spValidate(name, pwd) { // check user is approved or not
  this.userModel = new SignIn(name, pwd);
  this.accountService.validate(this.userModel).subscribe(data => {
    console.log(data);
    if (data === null) {
this.showError = true;
    } else  {
      this.showPasswordError = false;
      this.localStorageService.store('isLoggedIn', 'true');
      this.localStorageService.store('role', 'serviceprovider');
      this.localStorageService.store('userName', data.userName);
      this.localStorageService.store('ID', data.Id);
      this.localStorageService.store('role', data);
      this.status = false;
this.router.navigate(['/navheader/productbooking']);
    }
  }, error => {
    console.log(error);
  });
}
}