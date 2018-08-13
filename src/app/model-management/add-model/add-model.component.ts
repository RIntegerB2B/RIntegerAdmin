import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {PortFolioImageData} from './portFolioImageData.model';
import {Model} from './model.model';
import {ModelManagementService} from '../../model-management/model-management.service';
import {ServiceProviderDetail} from './service-provider-detail.model';
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  addModelForm: FormGroup;
  userModel: Model;
  spModel: ServiceProviderDetail;
  portFolioImageData: PortFolioImageData = new PortFolioImageData();
  spName: string;
  spId: string;
  spCompanyName: string;
  modelTypes = ['National', 'InterNational'];
  shootTypes = ['Men', 'Women'];


  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  constructor(private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService , private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.createForm();
    /* this.serviceprovider(); */
  }
  createForm() {
  this.addModelForm = this.fb.group({
    modelName: ['', Validators.required],
    description: ['', Validators.required],
    availability: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    emailId: ['', Validators.required],
    faceBook: ['', Validators.required],
    whatsapp: ['', Validators.required],
    shootType: [''],
      modelType: [''],
      modelHeight: [''],
      modelMeasurements: [''],
      shoulder: [''],
      shoeSize: ['']
  });
}
/* serviceprovider() {
  this.modelService.newSp.subscribe(data => {
 console.log(data.userName) ;
 this.localStorageService.store('userName', data.userName);
 this.localStorageService.store('companyName', data.companyName);
 this.localStorageService.store('Id', data.Id);
  });
} */

handleFileInput(files: FileList, loadedImage) {
  this.fileToUpload = files.item(0);
  this.portFolioImageData.portFolioImage = this.fileToUpload = files[0];
  this.reader.readAsArrayBuffer(this.fileToUpload);
  this.reader.onload = () => {
    const fileResult = this.reader.result;
    this.portFolioImageBytes = new Uint8Array(fileResult);
    this.portFolioImageBlob = new Blob([this.portFolioImageBytes.buffer]);
    const reader1 = new FileReader();
    reader1.readAsDataURL(this.portFolioImageBlob);
    reader1.onload = (e: Event & { target: { result: string } }) => {
      loadedImage.src = reader1.result;
    };
  };
}
  save(addModelForm: FormGroup , modelName: any) {
 this.userModel = new Model(
      addModelForm.controls.modelName.value,
      addModelForm.controls.description.value,
      addModelForm.controls.availability.value,
      addModelForm.controls.mobileNumber.value,
      addModelForm.controls.emailId.value,
      addModelForm.controls.faceBook.value,
      addModelForm.controls.whatsapp.value,
      addModelForm.controls.shootType.value,
      addModelForm.controls.modelType.value,
      addModelForm.controls.modelHeight.value,
      addModelForm.controls.modelMeasurements.value,
      addModelForm.controls.shoulder.value,
      addModelForm.controls.shoeSize.value

    );
    // sp details
    this.spName = this.localStorageService.retrieve('userName');
    this.spCompanyName = this.localStorageService.retrieve('companyName');
  this.spId = this.localStorageService.retrieve('Id');
  this.userModel.serviceProviderId = this.spId;
  this.userModel.serviceProviderCompanyName = this.spCompanyName;
  this.userModel.serviceProviderName = this.spName;
    this.userModel.portfolioImageName = this.portFolioImageData.portFolioImage.name;
    this.modelService.createModel(this.userModel).subscribe(data => {
      console.log(data);
    });
    this.uploadImage(modelName);
    addModelForm.reset();
  }
  uploadImage(modelName) {
    console.log(modelName);
    this.modelService.uploadportFolioImage(this.portFolioImageData, modelName).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
}
