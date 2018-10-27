import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Market } from './../../../shared/marketing.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MarketingManagementService } from './../marketing-management.service';


@Component({
  selector: 'app-marketing-management',
  templateUrl: './marketing-management.component.html',
  styleUrls: ['./marketing-management.component.css']
})
export class MarketingManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  marketDetailsForm: FormGroup;
  marketCustomer: Market[] = [];
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
  constructor(private fb: FormBuilder, private marketingManagementService: MarketingManagementService ,
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
    this.marketCustomer = rows;
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
    this.marketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      location: []
    });
  }
  // CRUD start
  cancel(edit) {
    edit.editing = false;
  }

  updateMarketCustomer(marketDetailsForm: FormGroup, row) {
    this.marketingManagementService.editMarketCustomer(row).subscribe(data => {
      this.marketCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  deleteMarketCustomer(marketDetailsForm: FormGroup, row) {
    row.editing = false;
    marketDetailsForm.reset();
    this.marketingManagementService.deleteMarketCustomer(row).subscribe(data => {
      this.marketCustomer = data;
    }, error => {
      console.log(error);
    });
  }

  addMarketCustomer(marketDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(MarketingAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  // CRUD end
  editDialogMarketCustomer(marketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(MarketingEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  getMarketAllCustomer() {
    this.marketingManagementService.allMarketCustomer().subscribe(data => {
      this.marketCustomer = data;
      /* this.temp = [...data]; */
      this.temp = data;
      console.log(this.marketCustomer);
    }, error => {
      console.log(error);
    });
  }
  // duplicate customer data find
  duplicateMarketCustomerData() {
    this.marketingManagementService.duplicateMarketCustomer().subscribe(data => {
      this.marketCustomer = data;
      console.log(this.marketCustomer);
    }, error => {
      console.log(error);
    });
  }
}

@Component({
  templateUrl: './marketing-edit.component.html'
})
export class MarketingEditComponent implements OnInit {
  marketDetailsForm: FormGroup;
  marketCustomer: Market[] = [] ;
  constructor(private fb: FormBuilder,
    private marketingManagementService: MarketingManagementService
    , public dialogRef: MatDialogRef<MarketingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Market) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.marketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      location: []
    });
  }
  updateMarket( marketDetailsForm: FormGroup, row) {
    this.marketingManagementService.editMarketCustomer(row).subscribe(data => {
      this.marketCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './marketing-add.component.html'
})
export class MarketingAddComponent implements OnInit {
  marketDetailsForm: FormGroup;
  marketCustomer: Market;
  constructor(private fb: FormBuilder,
    private marketingManagementService: MarketingManagementService, public dialogRef: MatDialogRef<MarketingAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Market) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.marketDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      location: []
    });
  }
  addMember(marketDetailsForm: FormGroup)   {
     this.marketCustomer = new Market(
      marketDetailsForm.controls.customerName.value,
      marketDetailsForm.controls.mobileNumber.value,
      marketDetailsForm.controls.whatsAppNo.value,
      marketDetailsForm.controls.landLine.value,
      marketDetailsForm.controls.email.value,
      marketDetailsForm.controls.location.value,
    );
    this.marketingManagementService.addSingleMarketCustomer(this.marketCustomer).subscribe(data => {
      this.marketCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
