import { Component, OnInit } from '@angular/core';
import { SignIn } from './sign.model';
import { AccountService } from '../account.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  onAdminForm: FormGroup;
  userModel: SignIn;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.onAdminForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  adminSubmit(onAdminForm: FormGroup) {
    this.userModel = new SignIn(
      onAdminForm.controls.userName.value,
      onAdminForm.controls.password.value,
    );

    this.accountService.signIn(this.userModel).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.router.navigate(['/details']);
      } else {
      }
    }, error => {
      console.log(error);
    });
  }
}