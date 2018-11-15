import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    this.modelService.serviceProviderModels(this.spId).subscribe(data => {
      this.Models = data;
      console.log(data);
     /*  const arrayLength = data.length - 1;
      for (let i = 0; i <= arrayLength; i++) {
        console.log(data[i].isScheduledBooking);
        switch (data[i].isScheduledBooking) {
          case true:
            {
              this.showScheduled = false;
              this.removeScheduled = true;
              break;
            }
          case false:
            {
              this.showScheduled = true;
              this.removeScheduled = false;
              break;
            }

        }
      } */
    });
  }
  delete(modelId, modelname) {
    this.spName = this.localStorageService.retrieve('username');
    this.modelId = modelId;
    this.modelService.deleteModel(this.modelId, this.spName, modelname).subscribe(data => {
      this.Models = data;
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
    this.modelService.allowScheduledModel(id, this.spId).subscribe(data => {
      this.Models = data;
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
    this.modelService.cancelScheduledModel(id, this.spId).subscribe(data => {
      this.Models = data;
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
  }
  addToAvailable(id) {
    this.spId = this.localStorageService.retrieve('id');
      this.message = 'added to available model';
      this.modelService.addToAvailable(id, this.spId).subscribe(data => {
        this.Models = data;
      });
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }
    removeFromAvailable(id) {
      this.localStorageService.clear('scheduledDate');
      this.spId = this.localStorageService.retrieve('id');
        this.message = 'removed from available model';
        this.modelService.removeFromAvailable(id, this.spId).subscribe(data => {
          this.Models = data;
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
