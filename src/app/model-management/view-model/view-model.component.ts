import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
  constructor(private fb: FormBuilder, private router: Router, private navheaderService: NavheaderService,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService) { }

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
    this.router.navigate(['/profile', this.spName, 'images', modelId]);
  }
  findModels() {
    this.spId = this.localStorageService.retrieve('Id');
    this.modelService.serviceProviderModels(this.spId).subscribe(data => {
      this.Models = data;
      const arrayLength = data.length - 1;
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
      }
    });
  }
  delete(modelId) {
    this.spName = this.localStorageService.retrieve('userName');
    this.modelId = modelId;
    this.modelService.deleteModel(this.modelId, this.spName).subscribe(data => {
      this.Models = data;
    });
  }
  addScheduled(id, isChecked) {
    const marketingIndex = this.selectModel.indexOf(id);
    if (isChecked) {
      this.selectModel.push(id);
    } else if (marketingIndex > -1) {
      this.selectModel.splice(marketingIndex, 1);
    }
    this.modelService.allowScheduledModel(id).subscribe(data => {
      this.Models = data;
    });
  }
  cancelScheduled(id, isChecked) {
    const marketingIndex = this.selectModel.indexOf(id);
    if (isChecked) {
      this.selectModel.push(id);
    } else if (marketingIndex > -1) {
      this.selectModel.splice(marketingIndex, 1);
    }
    this.modelService.cancelScheduledModel(id).subscribe(data => {
      this.Models = data;
    });
  }
  update(id) {
    this.modelId = id;
    this.router.navigate(['/model', this.modelId]);
  }
  addImage(modelId, modelName) {
    // console.log(modelId);
    // console.log(modelName);
    this.router.navigate(['/model', modelId, 'name', modelName]);
  }
}
