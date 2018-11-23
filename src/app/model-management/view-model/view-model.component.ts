import { Component, OnInit, Inject, DoCheck, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import { ModelManagementService } from '../../model-management/model-management.service';
import { NavheaderService } from '../../nav-header/nav-header.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Model } from '../add-model/model.model';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit , DoCheck {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectModel = [];
  spId;
  viewModelForm: FormGroup;
  Models: Model[] = [];
  modelId;
  spName;
  showScheduled: boolean;
  removeScheduled: boolean;
  unselectedModel = [];
  message;
  action;
  scheduledDate;

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  dataSource: any = [];
  array: any;
  temp: any = [];

  constructor(private fb: FormBuilder, private router: Router, private navheaderService: NavheaderService,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.findModels();
    this.createForm();
  }
  ngDoCheck() {
    this.scheduledDate = this.localStorageService.retrieve('scheduledDate');
  }
  createForm() {
    this.viewModelForm = this.fb.group({
      id: [''],
      Scheduled: [''],
      isScheduled: [''],
      RemoveScheduled: ['']
    });
  }
  viewProfile(modelId) {
    this.spName = this.localStorageService.retrieve('username');
    this.router.navigate(['/navheader/profile', this.spName, 'images', modelId]);
  }
  findModels() {
    this.spId = this.localStorageService.retrieve('id');
    this.scheduledDate = this.localStorageService.retrieve('scheduledDate');
    this.modelService.serviceProviderModels(this.spId)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.Models = response;
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
    this.dataSource = part;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const filterCustomer = Object.keys(this.temp[0]);
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
    this.dataSource = rows;
    /* this.table.offset = 0; */
  }
  delete(modelId, modelname) {
    this.spName = this.localStorageService.retrieve('username');
    this.modelId = modelId;
    this.modelService.deleteModel(this.modelId, this.spName, modelname)
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource<Element>(response);
      this.dataSource.paginator = this.paginator;
      this.array = response;
      this.Models = response;
      this.totalSize = this.array.length;
      this.temp = response;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  addScheduled(id) {
    this.message = 'model added to scheduled booking ';
    this.spId = this.localStorageService.retrieve('id');
    const dialogRef = this.dialog.open(ScheduledComponent, {
      width: '520px',
      disableClose: true,
      data: id
    });
    dialogRef.afterClosed();
    this.modelService.allowScheduledModel(id, this.spId)
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource<Element>(response);
      this.dataSource.paginator = this.paginator;
      this.array = response;
      this.Models = response;
      this.totalSize = this.array.length;
      this.temp = response;
      this.iterator();
    }, error => {
      console.log(error);
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
  }
  editDate(id) {
    this.spId = this.localStorageService.retrieve('id');
    const dialogRef = this.dialog.open(ScheduledComponent, {
      width: '520px',
      disableClose: true,
      data: id
    });
    dialogRef.afterClosed();
  }
  cancelScheduled(id) {
    this.localStorageService.clear('scheduledDate');
  this.spId = this.localStorageService.retrieve('id');
    this.message = 'model removed from scheduled booking ';
    this.modelService.cancelScheduledModel(id, this.spId)
    .subscribe((response) => {
      this.dataSource = new MatTableDataSource<Element>(response);
      this.dataSource.paginator = this.paginator;
      this.array = response;
      this.Models = response;
      this.totalSize = this.array.length;
      this.temp = response;
      this.iterator();
    }, error => {
      console.log(error);
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
  }
  addToAvailable(id) {
    this.spId = this.localStorageService.retrieve('id');
      this.message = 'added to available model';
      this.modelService.addToAvailable(id, this.spId)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.Models = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }
    removeFromAvailable(id) {
      this.localStorageService.clear('scheduledDate');
      this.spId = this.localStorageService.retrieve('id');
        this.message = 'removed from available model';
        this.modelService.removeFromAvailable(id, this.spId)
        .subscribe((response) => {
          this.dataSource = new MatTableDataSource<Element>(response);
          this.dataSource.paginator = this.paginator;
          this.array = response;
          this.Models = response;
          this.totalSize = this.array.length;
          this.temp = response;
          this.iterator();
        }, error => {
          console.log(error);
        });
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }
      addProjection(id) {
        this.message = 'added to projection model ';
        this.spId = this.localStorageService.retrieve('id');
        this.modelService.allowProjectionModel(id, this.spId)
        .subscribe((response) => {
          this.dataSource = new MatTableDataSource<Element>(response);
          this.dataSource.paginator = this.paginator;
          this.array = response;
          this.Models = response;
          this.totalSize = this.array.length;
          this.temp = response;
          this.iterator();
        }, error => {
          console.log(error);
        });
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }

      cancelProjection(id) {
        this.message = 'removed from projection model ';
        this.spId = this.localStorageService.retrieve('id');
        this.modelService.cancelProjectionModel(id, this.spId)
        .subscribe((response) => {
          this.dataSource = new MatTableDataSource<Element>(response);
          this.dataSource.paginator = this.paginator;
          this.array = response;
          this.Models = response;
          this.totalSize = this.array.length;
          this.temp = response;
          this.iterator();
        }, error => {
          console.log(error);
        });
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }
  update(id) {
    this.modelId = id;
    this.router.navigate(['/navheader/model', this.modelId]);
  }
  addImage(modelId, modelName) {
    // console.log(modelId);
    // console.log(modelName);
    this.router.navigate(['/navheader/model', modelId, 'name', modelName]);
  }
}
@Component({
  templateUrl: './scheduled-time.component.html'
})
export class ScheduledComponent implements OnInit {
  scheduledDateForm: FormGroup;
  message;
  action;
  Models: Model[] = [];
  spId;
  scheduled;
  scheduledDate;
  constructor(private fb: FormBuilder,  private router: Router,  public snackBar: MatSnackBar,
     private localStorageService: LocalStorageService, private modelService: ModelManagementService,
     public dialogRef: MatDialogRef<ScheduledComponent>,
     @Inject(MAT_DIALOG_DATA) public ID) {
       console.log(ID);
  }
  cancel(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.createViewForm();
/* this.scheduledDate = this.localStorageService.retrieve('scheduledDate'); */
 }
  createViewForm() {
    this.scheduledDateForm = this.fb.group({
      date: ['']
    });
  }
  save() {
   this.scheduled = this.scheduledDateForm.controls.date.value;
    this.spId = this.localStorageService.retrieve('id');
    this.modelService.addScheduledDate(this.ID, this.spId, this.scheduled).subscribe(data => {
      this.Models = data;
      this.localStorageService.store('scheduledDate', data[0].scheduledDate);
    });
    this.dialogRef.close();
   /*  this.modelService.serviceProviderModels(this.spId).subscribe(data => {
      this.Models = data;
      console.log(data);
    }); */
  }
}
