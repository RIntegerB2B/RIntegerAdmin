import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatStepper } from '@angular/material';
import { PageEvent } from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';
import {MatSnackBar} from '@angular/material';

import {ContactUsService} from '../contact-us.service';
import {CustomerQuery} from './query.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  mobileNumbers: any;
  mobileNumber = [];
  customerIdArr: any;
  customerId: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  customerModel: CustomerQuery [];
  contactForm: FormGroup;
  customerSource: any;
  handledCustomerSource: any = [];
  temp: any = [];
  breakpoint: number;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  setSpace: number;
  array: any;
  message;
  action;
  @ViewChild('myTable') table: any;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    public snackBar: MatSnackBar,
    private contactService: ContactUsService) { }

  ngOnInit() {
    this.showQuery();
    this.breakpoint = (window.innerWidth <= 350) ? 1 : 5;
    this.createForm();
    /* this.showHandledRequest(); */
  }

  createForm() {
    this.contactForm = this.fb.group({
    });
  }
showQuery() {
  this.contactService.viewQuery().subscribe((response) => {
    this.customerSource = new MatTableDataSource<Element>(response);
    this.customerSource.paginator = this.paginator;
    this.array = response;
    this.customerModel = response;
    this.totalSize = this.array.length;
    this.temp = response;
    this.iterator();
  }, error => {
    console.log(error);
  });
}
/* getValue(contactForm: FormGroup, isChecked,  id) {
  const index = this.mobileNumber.indexOf(id);
      if (isChecked.checked === true) {
        this.mobileNumber.push(id);
      } else  if (index > -1 ) {
        this.mobileNumber.splice(index, 1);
      }
       this.mobileNumbers = this.mobileNumber.toString();
  } */
onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 350) ? 1 : 5;
}
handlePage(e: any) {
  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
  this.iterator();
}
goBack(stepper: MatStepper) {
  stepper.previous();
}

goForward(stepper: MatStepper) {
  stepper.next();
}
iterator() {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.array.slice(start, end);
  this.customerSource = part;
}
updateFilter(event) {
  // this.showData = true;
  const val = event.target.value.toLowerCase();
  /* if (this.dataSource.length !== 0) { */
  const filterCustomer = Object.keys(this.temp[0]);
  // Removes last "$$index" from "column"
  filterCustomer.splice(filterCustomer.length - 1);
  if (!filterCustomer.length) {
    return;
  }
  const rows = this.temp.filter(function (d) {
    for (let i = 0; i <= filterCustomer.length; i++) {
      const column = filterCustomer[i];
      if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
        return true;
      }
    }
  });
  this.customerSource = rows;
}
requestHandled(id) {
  this.message = 'Moved to Handled Request';
  this.contactService.requestHandled(id).subscribe((response) => {
    this.customerSource = new MatTableDataSource<Element>(response);
    this.customerSource.paginator = this.paginator;
    this.array = response;
    this.customerModel = response;
    this.totalSize = this.array.length;
    this.temp = response;
    this.iterator();
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
  }, error => {
    console.log(error);
  });
  /* this.goForward(stepper); */
}
showHandledRequest() {
  this.contactService.hanldedRequest().subscribe((response) => {
    this.customerSource = new MatTableDataSource<Element>(response);
    console.log(this.customerSource);
    this.customerSource.paginator = this.paginator;
    this.array = response;
    this.customerModel = response;
    this.totalSize = this.array.length;
    this.temp = response;
    this.iterator();
  }, error => {
    console.log(error);
  });
}
}