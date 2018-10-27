import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../shared/customer.model';
import { CustomerManagementService } from '../../customer-management/customer-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {


  arrayBuffer: any;
  file: File;
  customerDetailsForm: FormGroup;
  newCustomer: Customer[] = [];
  @ViewChild('myTable') table: any;
  mobileNumbers;
  selectedMobileNumbers = [];
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  constructor(private fb: FormBuilder, private customerService: CustomerManagementService,
   private http: HttpClient, private dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.createForm();
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
    this.newCustomer = rows;
    this.table.offset = 0;
  }
  changePageLimit(limit: any) {
    this.currentPageLimit = parseInt(limit, 10);
  }
  onLimitChange(limit: any) {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
      }
    });
  }

  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      mobileNumber: ['', Validators.maxLength(10)],
      name: [],
      emailId: [],
      location: [],
      bookingType: [],
      shootType: [],
      modelType: [],
      product: [],
      companyAddress: [],
      gstNumber: [],
      customerGrade: [],
      brandName: [],
    });
  }
  // CRUD start
  cancel(edit) {
    edit.editing = false;
  }

  updateCustomer(customerDetailsForm: FormGroup, row) {
    this.customerService.editCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  deleteCustomer(customerDetailsForm: FormGroup, row) {
    row.editing = false;
    customerDetailsForm.reset();
    this.customerService.deleteCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }

  addCustomer(customerDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(CustomerAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  // CRUD end
  editCustomer(customerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  getAllCustomer() {
    this.customerService.allCustomer().subscribe(data => {
      this.newCustomer = data;
      /* this.temp = [...data]; */
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // duplicate customer data find
  duplicateCustomerData() {
    this.customerService.duplicateCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
}

@Component({
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  customerDetailsForm: FormGroup;
  newCustomer: Customer[] = [] ;
  constructor(private fb: FormBuilder,
    private customerService: CustomerManagementService
    , public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      mobileNumber: ['', Validators.maxLength(10)],
      name: [],
      emailId: [],
      location: [],
      bookingType: [],
      shootType: [],
      modelType: [],
      product: [],
      companyAddress: [],
      gstNumber: [],
      customerGrade: [],
      brandName: [],
    });
  }
  update( customerDetailsForm: FormGroup, row) {
    this.customerService.editCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './customer-add.component.html'
})
export class CustomerAddComponent implements OnInit {
  customerDetailsForm: FormGroup;
  newCustomer: Customer;
  constructor(private fb: FormBuilder,
    private customerService: CustomerManagementService, public dialogRef: MatDialogRef<CustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      mobileNumber: ['', Validators.maxLength(10)],
      name: [],
      emailId: [],
      location: [],
      bookingType: [],
      shootType: [],
      modelType: [],
      product: [],
      companyAddress: [],
      gstNumber: [],
      customerGrade: [],
      brandName: [],
    });
  }
  addMember(customerDetailsForm: FormGroup)   {
     this.newCustomer = new Customer(
      customerDetailsForm.controls.mobileNumber.value,
      customerDetailsForm.controls.name.value,
      customerDetailsForm.controls.emailId.value,
      customerDetailsForm.controls.location.value,
      customerDetailsForm.controls.bookingType.value,
      customerDetailsForm.controls.shootType.value,
      customerDetailsForm.controls.modelType.value,
      customerDetailsForm.controls.product.value,
      customerDetailsForm.controls.companyAddress.value,
      customerDetailsForm.controls.gstNumber.value,
      customerDetailsForm.controls.customerGrade.value,
      customerDetailsForm.controls.brandName.value
    );
    this.customerService.addSingleCustomer(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
