import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '../notification.service';
import {CustomerManagementService} from '../../customer-management/customer-management.service';
import { PushNotification } from './push-notification.model';
import {Customers} from '../../customer-management/customer-details/customer.model';
import {AppSetting} from '../../config/appSetting';



@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {
  imageUrl: string = AppSetting.imageUrl;
  pushNotificationForm: FormGroup;
  pushNotificationModel: PushNotification;
  customerModel: Customers;
  showData: boolean;
  mobileNumber = [];
  mobileNumbers;
  modelTypes = ['National', 'InterNational', 'All'];
shootTypes = ['Men', 'Women', 'Kids', 'Others', 'All'];
  constructor(private fb: FormBuilder, private notificationService: NotificationService,
     private customerService: CustomerManagementService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.pushNotificationForm = this.fb.group({
      mobileNumbers: ['', Validators.required],
      title: ['', Validators.required],
      isAdmin: [false, Validators.required],
      notificationBody: ['', Validators.required],
      imageUrl: [this.imageUrl, Validators.required],
      customer: [''],
    });
  }
  customers() {
    this.customerService.findCustomers().subscribe(data => {
      this.customerModel = data;
      /* console.log(data); */
    });
    }
  getShootType(id) {
    this.showData = true;
    if (id === 'All') {
    this.customers();
    } else {
      this.customerService.findShootType(id).subscribe(data => {
        this.customerModel = data;
       });
    }
  }
  getModelType(id, id2) {
    this.showData = true;
    if (id2 === 'All') {
      this.customerService.findShootType(id).subscribe(data => {
        this.customerModel = data;
       });
      } else {
    this.customerService.findModelType(id, id2).subscribe(data => {
     this.customerModel = data;
    /*  console.log(data); */
    });
  }
  }
  getValue(pushNotificationForm: FormGroup, value , isChecked) {
    const index = this.mobileNumber.indexOf(value);
      if (isChecked) {
        this.mobileNumber.push(value);
      } else  if (index > -1 ) {
        this.mobileNumber.splice(index, 1);
      }
    }
    sendNumbers() {
    this.mobileNumbers = this.mobileNumber.toString();
    this.pushNotificationForm.controls.mobileNumbers.setValue( this.mobileNumbers);
      console.log(this.mobileNumbers);
    }
  pushNotification(pushNotificationForm: FormGroup) {
    this.pushNotificationModel = new PushNotification(
      pushNotificationForm.controls.mobileNumbers.value,
      pushNotificationForm.controls.title.value,
      pushNotificationForm.controls.isAdmin.value,
      pushNotificationForm.controls.notificationBody.value,
      pushNotificationForm.controls.imageUrl.value
    );
    this.notificationService.pushNotification(this.pushNotificationModel).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
