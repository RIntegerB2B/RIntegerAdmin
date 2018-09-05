import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { ModelManagementService } from '../../model-management/model-management.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Model } from '../add-model/model.model';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  spId;
  viewModelForm;
  Models: Model[] = [];
  modelId;
  spName;
  constructor(private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.findModels();
    this.createForm();
  }
  createForm() {
    this.viewModelForm = this.fb.group({
      id: ['']
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
      console.log(data);
    });
  }
  delete(modelId) {
    this.modelId = modelId;
    this.modelService.deleteModel(this.modelId).subscribe(data => {
      this.Models = data;
      console.log(data);
    });
  }
  update(id) {
    this.modelId = id;
    this.router.navigate(['/model', this.modelId]);
  }
  addImage(modelId, modelName) {
    console.log(modelId);
    console.log(modelName);
    this.router.navigate(['/model', modelId, 'name', modelName]);
  }
}
