import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatStepper } from '@angular/material';
import { PageEvent } from '@angular/material';
import { NotificationService } from '../notification.service';
import { CustomerManagementService } from './../../crm/customer-management/customer-management.service';
import { MarketingManagementService } from './../../crm/marketing-management/marketing-management.service';
import { Market } from './../../shared/marketing.model';
import { PushNotification } from './push-notification.model';
import { Customer } from '../../shared/customer.model';
import {AppSetting} from '../../config/appSetting';



@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  imageUrl: string = AppSetting.imageUrl;
  serviceUrl: string = AppSetting.serviceUrl;
  pushNotificationForm: FormGroup;
  pushNotificationModel: PushNotification;
  customerModel: Customer;
  customerMarket: Market;
  rows: any = [];
  columns: any = [];
  temp: any = [];
  showData: boolean;
  customerSource: any = [];
  mobileNumber = [];
  mobileNumbers;
  selectNo: string = this.mobileNumber.toString();
  @ViewChild('myTable') table: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  breakpoint: number;
  setSpace: number;
  array: any;
  modelTypes = ['National', 'InterNational', 'All'];
  shootTypes = ['Men', 'Women', 'Kids', 'Others', 'All'];
  constructor(private fb: FormBuilder, private notificationService: NotificationService,
     private customerService: CustomerManagementService, private marketingManagementService: MarketingManagementService) { }
  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
    this.breakpoint = (window.innerWidth <= 350) ? 1 : 4;
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 350) ? 1 : 4;
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
  createForm() {
    this.pushNotificationForm = this.fb.group({
      mobileNumbers: [ '', Validators.required],
      title: ['', Validators.required],
      isAdmin: [false, Validators.required],
      notificationBody: ['', Validators.required],
      imageUrl: [this.imageUrl, Validators.required],
      linkUrl: [this.serviceUrl, Validators.required],
      customer: [''],
    });
  }
  getAllCustomer() {
    this.customerService.allCustomer()
      .subscribe((response) => {
        this.customerSource = new MatTableDataSource<Element>(response);
        this.customerSource.paginator = this.paginator;
        this.array = response;
        this.customerMarket = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllSubscribe() {
    this.customerService.getAllSubscribeCustomer()
      .subscribe((response) => {
        this.customerSource = new MatTableDataSource<Element>(response);
        this.customerSource.paginator = this.paginator;
        this.array = response;
        this.customerMarket = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllMarketCustomers()     {
    this.marketingManagementService.allMarketCustomer()
    .subscribe((response) => {
      this.customerSource = new MatTableDataSource<Element>(response);
      this.customerSource.paginator = this.paginator;
      this.array = response;
      this.customerMarket = response;
      this.totalSize = this.array.length;
      this.temp = response;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.customerSource = part;
  }
  /*customers() {
    this.customerService.findCustomers().subscribe(data => {
      this.customerModel = data;
       console.log(data);
    });
    }*/
  /* getShootType(id) {
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
    console.log(data);
    });
  }
  }*/

  getValue(pushNotificationForm: FormGroup, isChecked,  mobileNo) {
    const index = this.mobileNumber.indexOf(mobileNo);
      if (isChecked.checked === true) {
        this.mobileNumber.push(mobileNo);
      } else  if (index > -1 ) {
        this.mobileNumber.splice(index, 1);
      }
       this.mobileNumbers = this.mobileNumber.toString();
      this.pushNotificationForm.controls.mobileNumbers.setValue(this.mobileNumbers);
      console.log(this.mobileNumbers);
    }
    sendNumbers() {
    this.mobileNumbers = this.mobileNumber.toString();
    this.pushNotificationForm.controls.mobileNumbers.setValue( this.mobileNumbers);
      console.log(this.mobileNumbers);
    }
    updateFilter(event) {
      // this.showData = true;
      const val = event.target.value.toLowerCase();
      /* if (this.dataSource.length !== 0) { */
      const filterCustomer = Object.keys(this.temp[0]);
      // Removes last "$$index" from "column"
      filterCustomer.splice(filterCustomer.length - 1);
      console.log(filterCustomer);
      if (!filterCustomer.length) {
        return;
      }
      const rows = this.temp.filter(function (d) {
        for (let i = 0; i <= filterCustomer.length; i++) {
          const column = filterCustomer[i];
          console.log(d[column]);
          if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
            return true;
          }
        }
      });
      this.customerSource = rows;
    }

  pushNotification(pushNotificationForm: FormGroup) {
    this.pushNotificationModel = new PushNotification(
      pushNotificationForm.controls.mobileNumbers.value,
      pushNotificationForm.controls.title.value,
      pushNotificationForm.controls.isAdmin.value,
      pushNotificationForm.controls.notificationBody.value,
      pushNotificationForm.controls.imageUrl.value,
      pushNotificationForm.controls.linkUrl.value
    );
    this.notificationService.pushNotification(this.pushNotificationModel).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
