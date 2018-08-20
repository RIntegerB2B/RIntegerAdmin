import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {CustomerManagementService} from '../customer-management.service';
import {Customers} from './customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  viewCustomerForm: FormGroup;
  customerModel: Customers;
  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerManagementService) { }

  ngOnInit() {
   /*  this.customers(); */
    this.createForm();
  }
  createForm() {
    this.viewCustomerForm = this.fb.group({
      mobValue: ['']
    });
  }
  getShootType(id) {
if (id === 'All') {
this.customers();
} else {
  this.customerService.findShootType(id).subscribe(data => {
    this.customerModel = data;
   });
}

  }
  getModelType(id, id2) {
    this.customerService.findModelType(id, id2).subscribe(data => {
     this.customerModel = data;
     console.log(data);
    });
  }
customers() {
this.customerService.findCustomers().subscribe(data => {
  this.customerModel = data;
  console.log(data);
});
}
getValue(value) {
console.log(value);
}
getProduct(product) {
if (product === 'All' ) {
this.customers();
} else {
  this.customerService.findProductType(product).subscribe(data => {
    this.customerModel = data;
    console.log(data);
   });
}
}
}
