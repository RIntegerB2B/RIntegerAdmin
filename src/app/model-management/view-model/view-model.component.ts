import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';


import {ModelManagementService} from '../../model-management/model-management.service';
import { LocalStorageService } from 'ngx-webstorage';
import {Model} from '../add-model/model.model';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
spId;
viewModelForm;
Models: Model[] = [];
  constructor(private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService, private locatStorageService: LocalStorageService) { }

  ngOnInit() {
    this.findModels();
    this.createForm();
  }
  createForm() {
this.viewModelForm = this.fb.group({

});
  }
findModels() {
this.spId = this.locatStorageService.retrieve('Id');
this.modelService.serviceProviderModels(this.spId).subscribe( data => {
  this.Models = data;
   console.log(data);
});
 }
}
