import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {ServiceProvider} from './service-provider.model';
import {AccountService} from '../account.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  headCatSelected;
  userModel: ServiceProvider;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
        companyName: ['', Validators.required],
        emailId: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        website: ['', Validators.required],
        location: ['', Validators.required]
      });
  }
  getCategory(id) {
  this.headCatSelected = id;
if (this.headCatSelected === 'serviceProvider') {
}
  }


  register(registerForm: FormGroup) {
  this.userModel = new ServiceProvider(
    registerForm.controls.name.value,
    registerForm.controls.companyName.value,
    registerForm.controls.emailId.value,
    registerForm.controls.mobileNumber.value,
    registerForm.controls.website.value,
    registerForm.controls.location.value,
    registerForm.controls.password.value
  );
  this.accountService.registration(this.userModel).subscribe(data => {
    console.log(data);
    this.router.navigate(['/signIn']);
   }, error => {
     console.log(error);
   });
   this.registerForm.reset();
}

  }
