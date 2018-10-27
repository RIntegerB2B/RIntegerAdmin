import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


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
export class ViewModelComponent implements OnInit {
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
  constructor(private fb: FormBuilder, private router: Router, private navheaderService: NavheaderService,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.findModels();
    this.createForm();
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
    this.spName = this.localStorageService.retrieve('userName');
    this.router.navigate(['/navheader/profile', this.spName, 'images', modelId]);
  }
  findModels() {
    this.spId = this.localStorageService.retrieve('Id');
    this.modelService.serviceProviderModels(this.spId).subscribe(data => {
      this.Models = data;
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
  delete(modelId) {
    this.spName = this.localStorageService.retrieve('userName');
    this.modelId = modelId;
    this.modelService.deleteModel(this.modelId, this.spName).subscribe(data => {
      this.Models = data;
    });
  }
  addScheduled(id) {
    this.message = 'model added to scheduled booking ';
    this.spId = this.localStorageService.retrieve('Id');
   /*  const marketingIndex = this.selectModel.indexOf(id);
    if (isChecked) {
      this.selectModel.push(id);
    } else if (marketingIndex > -1) {
      this.selectModel.splice(marketingIndex, 1);
    } */
    this.modelService.allowScheduledModel(id, this.spId).subscribe(data => {
      this.Models = data;
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
  }
  cancelScheduled(id) {
  this.spId = this.localStorageService.retrieve('Id');
      /* const marketingIndex = this.selectModel.indexOf(id);
    if (isChecked) {
      this.unselectedModel.push(id);
    } else if (marketingIndex > -1) {
      this.unselectedModel.splice(marketingIndex, 1);
    } */
    this.message = 'model removed from scheduled booking ';
    this.modelService.cancelScheduledModel(id, this.spId).subscribe(data => {
      this.Models = data;
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
  }
  addToAvailable(id) {
    this.spId = this.localStorageService.retrieve('Id');
        /* const marketingIndex = this.selectModel.indexOf(id);
      if (isChecked) {
        this.unselectedModel.push(id);
      } else if (marketingIndex > -1) {
        this.unselectedModel.splice(marketingIndex, 1);
      } */
      this.message = 'added to available model';
      this.modelService.addToAvailable(id, this.spId).subscribe(data => {
        this.Models = data;
      });
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }
    removeFromAvailable(id) {
      this.spId = this.localStorageService.retrieve('Id');
          /* const marketingIndex = this.selectModel.indexOf(id);
        if (isChecked) {
          this.unselectedModel.push(id);
        } else if (marketingIndex > -1) {
          this.unselectedModel.splice(marketingIndex, 1);
        } */
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
