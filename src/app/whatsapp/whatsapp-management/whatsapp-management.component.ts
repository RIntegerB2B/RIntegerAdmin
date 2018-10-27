import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatStepper } from '@angular/material';
import { PageEvent } from '@angular/material';
import { WhatsappService } from './../../whatsapp/whatsapp.service';
import { CustomerManagementService } from './../../crm/customer-management/customer-management.service';
import { MarketingManagementService } from './../../crm/marketing-management/marketing-management.service';
import { Market } from './../../shared/marketing.model';
import { Customer } from '../../shared/customer.model';
import {AppSetting } from '../../config/appSetting';

@Component({
  selector: 'app-whatsapp-management',
  templateUrl: './whatsapp-management.component.html',
  styleUrls: ['./whatsapp-management.component.css']
})
export class WhatsappManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  imageUrl: string = AppSetting.imageUrl;
  serviceUrl: string = AppSetting.serviceUrl;
  customerModel: Customer;
  whatsappForm: FormGroup;
  whatsappShareUrl;
  customerMarket: Market;
  rows: any = [];
  columns: any = [];
  temp: any = [];
  showData: boolean;
  customerSource: any = [];
  mobileNumber = [];
  mobileNumbers;
  whatsappText;
  @ViewChild('myTable') table: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  breakpoint: number;
  setSpace: number;
  array: any;
  constructor(private fb: FormBuilder,
     private customerService: CustomerManagementService,
      private marketingManagementService: MarketingManagementService, private whatsappService: WhatsappService) { }

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
    this.whatsappForm = this.fb.group({
      mobileNumbers: [ '', Validators.required],
      whatsappText: ['', Validators.required],
    });
  }
  whatsappShare(whatsappForm: FormGroup, mobileNumbers, whatsappText) {
    this.whatsappShareUrl = 'https://api.whatsapp.com/send?phone=91' + mobileNumbers + '&text=' + encodeURIComponent(whatsappText);
    window.open(this.whatsappShareUrl);
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
  getValue(whatsappForm: FormGroup, isChecked,  mobileNo) {
    const index = this.mobileNumber.indexOf(mobileNo);
      if (isChecked.checked === true) {
        this.mobileNumber.push(mobileNo);
      } else  if (index > -1 ) {
        this.mobileNumber.splice(index, 1);
      }
       this.mobileNumbers = this.mobileNumber.toString();
      this.whatsappForm.controls.mobileNumbers.setValue(this.mobileNumbers);
      console.log(this.mobileNumbers);
    }
    sendNumbers() {
    this.mobileNumbers = this.mobileNumber.toString();
    this.whatsappForm.controls.mobileNumbers.setValue( this.mobileNumbers);
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

  /* pushNotification(whatsappForm: FormGroup) {
    this.whatsappForm = new WhatsApp(
      whatsappForm.controls.mobileNumbers.value,
      whatsappForm.controls.title.value,
      whatsappForm.controls.isAdmin.value,
      whatsappForm.controls.notificationBody.value,
      whatsappForm.controls.imageUrl.value,
      whatsappForm.controls.linkUrl.value
    );
    this.whatsappService.pushNotification(this.pushNotificationModel).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  } */
}
