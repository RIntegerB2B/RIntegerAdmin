import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {User} from './user.model';
import {AccountService} from '../account.service';
import {mobileNumber} from './validation';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  users;
  userModel: User;
  userTypes = ['Service Provider', 'Agency' , 'Model'];
  registered: boolean;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
      this.registerForm = this.fb.group({
        name: ['', Validators.minLength(3)],
        password: ['', Validators.required],
        companyName: [''],
        emailId: [''],
        mobileNumber: ['', mobileNumber],
        website: [''],
        location: [''],
        userType: ['', Validators.required]
      });
  }
  getType(user) {
  this.users = user;
  console.log(this.users);

  }


  register(registerForm: FormGroup) {
  this.userModel = new User(
    registerForm.controls.name.value,
    registerForm.controls.companyName.value,
    registerForm.controls.emailId.value,
    registerForm.controls.mobileNumber.value,
    registerForm.controls.website.value,
    registerForm.controls.location.value,
    registerForm.controls.password.value
  );
  this.userModel.userType = this.users;
  this.accountService.registration(this.userModel).subscribe(data => {
    console.log(data);
   /*  this.router.navigate(['/signIn']); */
   this.registered = true;
   }, error => {
     console.log(error);
   });
   this.registerForm.reset();
}

  }
