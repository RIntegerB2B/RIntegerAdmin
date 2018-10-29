import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserManagementService } from './../../user-management.service';
import { Permission } from './permission.model';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  permissionForm: FormGroup;
  permission: Permission;
  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router, public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userAccess();
  }
  userAccess() {
    this.permissionForm = this.fb.group({
      _id: ['', Validators.required],
      role: ['', Validators.required],
      currentDate: ['', Validators.required],
      mainMenuPermission: this.fb.group({
        productBookingMgmt: new FormControl(false, Validators.required),
        digitalBusinessMgmt: new FormControl(false, Validators.required),
        itServicesBookingMgmt: new FormControl(false, Validators.required),
        modelMgmt: new FormControl(false, Validators.required),
        databaseMgmt: new FormControl(false, Validators.required),
        marketingMgmt: new FormControl(false, Validators.required),
        userMgmt: new FormControl(false, Validators.required)
      }),
      menuPermission: this.fb.group({
        scheduledModel: new FormControl(false, Validators.required),
        productShoot: new FormControl(false, Validators.required),
        modelShoot: new FormControl(false, Validators.required),
        creativeShoot: new FormControl(false, Validators.required),
        imageEditing: new FormControl(false, Validators.required),
        registrationSetup: new FormControl(false, Validators.required),
        catalogingListing: new FormControl(false, Validators.required),
        marketingServices: new FormControl(false, Validators.required),
        accountMgmt: new FormControl(false, Validators.required),
        aplusCataloging: new FormControl(false, Validators.required),
        itServices: new FormControl(false, Validators.required),
        addModel: new FormControl(false, Validators.required),
        viewModel: new FormControl(false, Validators.required),
        customerDB: new FormControl(false, Validators.required),
        marketingDB: new FormControl(false, Validators.required),
        upload: new FormControl(false, Validators.required),
        bulkPushNotification: new FormControl(false, Validators.required),
        whatsapp: new FormControl(false, Validators.required),
        subscribe: new FormControl(false, Validators.required),
        permission: new FormControl(false, Validators.required),
        register: new FormControl(false, Validators.required),
        contact: new FormControl(false, Validators.required),
      }),
    });
  }
  accessPermission(permissionForm: FormGroup) {
    this.permission = new Permission(
      permissionForm.controls.role.value,
      permissionForm.controls.currentDate.value,
      permissionForm.controls.mainMenuPermission.value,
      permissionForm.controls.menuPermission.value,
    );
    console.log(this.permissionForm);
    this.userManagementService.permissionUsers(this.permission).subscribe(data => {
      console.log(data);
      this.router.navigate(['/navheader/register']);
    }, error => {
      console.log(error);
    });
  }
}
