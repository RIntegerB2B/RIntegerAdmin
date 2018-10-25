import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';

import { PrimeImageData } from './primeImageData.model';
import { Model } from './model.model';
import { ModelManagementService } from '../../model-management/model-management.service';
import { ServiceProviderDetail } from './service-provider-detail.model';
import { UpdateModel } from '../add-model/update.model';
import { NavheaderService } from '../../nav-header/nav-header.service';
import { mobileNumber } from './mobile-validation';


@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  addModelForm: FormGroup;
  userModel: Model;
  path;
  showError: boolean;
  showError2: boolean;
  showAvailability: boolean;
  showModel: boolean;
  spModel: ServiceProviderDetail;
  primeImageData: PrimeImageData = new PrimeImageData();
  spName: string;
  spId: string;
  spCompanyName: string;
  modelTypes = ['National', 'InterNational'];
  shootTypes = ['Men', 'Women'];
  id;
  Availability = ['Yes', 'No'];
  modelAvailable = ['Yes', 'No'];
  loadedModel: Model;
  showUpdate: boolean;
  hideImg: boolean;
  updatedModel: UpdateModel;
  modelAvailability;
  multipleImages = [];


  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  constructor(private fb: FormBuilder, private router: Router,
    private modelService: ModelManagementService, private localStorageService: LocalStorageService,
    private navheaderService: NavheaderService,
    private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
    if (this.id) {
      this.getModel(this.id);
    }
  }
  createForm() {
    this.addModelForm = this.fb.group({
      modelName: ['', Validators.required],
      description: [''],
      mobileNumber: [''],
      emailId: [''],
      faceBook: [''],
      whatsapp: [''],
      shootType: [''],
      modelType: [''],
      modelId: [''],
      available: ['']
      /*   modelAvail: [''] */
      /*  modelHeight: [''],
       modelMeasurements: [''],
       shoulder: [''],
       shoeSize: ['']  */
    });
  }




  handleFileInput(files: FileList, loadedImage) {
    this.fileToUpload = files.item(0);
    this.primeImageData.primeImage = this.fileToUpload = files[0];
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
    console.log(this.primeImageData);
  }

  avail(modelAva) {
    console.log(modelAva);
    this.modelAvailability = modelAva;
  }
  getModel(id) {

    this.showUpdate = true;
    this.hideImg = true;
    this.modelService.getModelDetails(id).subscribe(data => {
      this.loadedModel = data;
      /* console.log(this.loadedModel.primeImage);
      console.log(this.loadedModel); */
      this.addModelForm.setValue({
        modelName: this.loadedModel.userName,
        description: this.loadedModel.description,
        mobileNumber: this.loadedModel.mobileNumber,
        emailId: this.loadedModel.emailId,
        faceBook: this.loadedModel.faceBook,
        whatsapp: this.loadedModel.whatsapp,
        shootType: this.loadedModel.categoryType,
        modelType: this.loadedModel.modelType,
        modelId: id,
        available: this.loadedModel.availability,
      });
    }, error => {
      console.log(error);
    });
  }
  save(addModelForm: FormGroup, modelName: any) {
    if (modelName === '') {
      this.showError = true;
      this.showError2 = false;
      this.showAvailability = false;
      this.showModel = false;
    } else if (addModelForm.controls.available.value === '') {
      this.showError = false;
      this.showError2 = false;
      this.showAvailability = true;
      this.showModel = false;
    } else if (addModelForm.controls.modelType.value === '') {
      this.showError = false;
      this.showError2 = false;
      this.showAvailability = false;
      this.showModel = true;
    } else if (this.fileToUpload === null) {
      this.showError = false;
      this.showError2 = true;
      this.showAvailability = false;
      this.showModel = false;
    } else if (modelName !== 0 && this.fileToUpload != null && addModelForm.controls.available.value != null
      && addModelForm.controls.modelType.value != null) {
      this.showError = false;
      this.showError2 = false;
      this.showAvailability = false;
      this.showModel = false;
      this.userModel = new Model(
        addModelForm.controls.modelName.value,
        addModelForm.controls.description.value,
        addModelForm.controls.available.value,
        addModelForm.controls.mobileNumber.value,
        addModelForm.controls.emailId.value,
        addModelForm.controls.faceBook.value,
        addModelForm.controls.whatsapp.value,
        addModelForm.controls.modelType.value,
        addModelForm.controls.shootType.value,
      );
      // sp details
      /*  this.userModel.availability = this.modelAvailability; */
      this.spName = this.localStorageService.retrieve('userName');
      this.spCompanyName = this.localStorageService.retrieve('companyName');
      this.spId = this.localStorageService.retrieve('Id');
      this.userModel.serviceProviderId = this.spId;
      this.userModel.serviceProviderCompanyName = this.spCompanyName;
      this.userModel.serviceProviderName = this.spName;
      this.userModel.primeImage = this.primeImageData.primeImage.name;
      this.modelService.createModel(this.userModel).subscribe(data => {
        console.log(data);
      });
      this.uploadImage(modelName, this.spName);
      addModelForm.reset();
      this.router.navigate(['/models']);
    }

  }
  edit(addModelForm: FormGroup, modelName: any, modelDesc: any, id: any,
    mob: any, email: any, fb: any, wapp: any) {
    this.updatedModel = new UpdateModel(
      id,
      modelName,
      modelDesc,
      addModelForm.controls.available.value,
      mob,
      email,
      fb,
      wapp,
      addModelForm.controls.modelType.value,
      addModelForm.controls.shootType.value
    );
    // this.updatedModel.portfolioImageName = this.portFolioImageData.portFolioImage.name;
    this.modelService.updateModel(id, this.updatedModel).subscribe(data => {
      console.log(data);
      //  this.uploadImage(modelName , this.spName);
      this.router.navigate(['/models']);
    }, error => {
      console.log(error);
    });
  }
  uploadImage(modelName, spName) {
    this.modelService.uploadprimeImage(this.primeImageData, modelName, spName).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
}