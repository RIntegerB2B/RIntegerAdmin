import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Register } from './register.model';
import { Permission } from './../permission/permission/permission.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  accessForm: FormGroup;
  register: Register;
  newRole: any;
  roleData: Permission[] = [];
  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService, private router: Router, public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userRegister();
    this.getAllRoleType();
  }
  userRegister() {
    this.registerForm = this.fb.group({
      _id: [''],
      userName: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      mobileNumber: ['', Validators.required],
      email: [''],
      role: ['', Validators.required]
    });
  }
  getAllRoleType() {
    this.userManagementService.permissionRoleType().subscribe(data => {
      this.roleData = data;
      console.log(this.roleData);
    }, error => {
      console.log(error);
    });
  }
  regSubmit(registerForm: FormGroup) {
    this.register = new Register(
      registerForm.controls.userName.value,
      registerForm.controls.password.value,
      registerForm.controls.mobileNumber.value,
      registerForm.controls.email.value,
      registerForm.controls.role.value
    );
    this.userManagementService.registration(this.register).subscribe(data => {
      console.log(data);
      this.router.navigate(['/signin']);
    }, error => {
      console.log(error);
    });
  }
}
