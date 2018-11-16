import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { PrimeImageData } from '../add-model/primeImageData.model';

import { ModelManagementService } from '../model-management.service';
import { Model } from '../add-model/model.model';
import { NavheaderService } from '../../nav-header/nav-header.service';
import {EditModel} from './edit-profile.model';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  serviceProviderName;
  modelId;
  Model: Model;
  viewProfileForm: FormGroup;
  showEcommerce: boolean;
  showPortrait: boolean;
  showProduct: boolean;
  showProfile: boolean;
  showAll: boolean;
  showPortFolio: boolean;
  changePrime: boolean;
  ecommerceImageNames = [];
  name;
  loadedModelName;
  spName;
  spCompanyName;
  spId;
  editModel: EditModel;

  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  primeImageData: PrimeImageData = new PrimeImageData();
  modelName;
  message;
  action;
  modelecomLength;
  modelproductLength;
  modelportfolioLength;
  portfolioImgName;
productImgName;
  ecommImgName;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private navheaderService: NavheaderService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, private modelService: ModelManagementService) {
    this.serviceProviderName = this.activatedRoute.snapshot.paramMap.get('name');
    this.modelId = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.findImages();
    this.createForm();
    this.showProfile = true;
  }
  createForm() {
    this.viewProfileForm = this.fb.group({
      prodImgId: [''],
      ecomImgId: [''],
      porImgId: [''],
      id: [''],
      portID: [''],
      portFolioID: ['']
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
  }
  findImages() {
    this.modelService.findImages(this.serviceProviderName, this.modelId).subscribe(data => {
      this.Model = data;
     this.modelecomLength = this.Model[0].ecommerceImageName.length - 1;
      for  (let i = 0 ; i <= this.modelecomLength ; i++ ) {
        const ecomLength = this.Model[0].ecommerceImageName[i].lastIndexOf('/') + 1;
        this.ecommImgName = this.Model[0].ecommerceImageName[i].substr(ecomLength);
this.Model[0].ecommerceImages.push(this.ecommImgName);
      }
      // prod
      this.modelproductLength = this.Model[0].productImageName.length - 1;
      for  (let i = 0 ; i <= this.modelproductLength ; i++ ) {
        const prodLength = this.Model[0].productImageName[i].lastIndexOf('/') + 1;
        this.productImgName = this.Model[0].productImageName[i].substr(prodLength);
this.Model[0].productImages.push(this.productImgName);
      }
      // portfolio
      this.modelportfolioLength = this.Model[0].portFolioImageName.length - 1;
      for  (let i = 0 ; i <= this.modelportfolioLength ; i++ ) {
        const portfolioLength = this.Model[0].portFolioImageName[i].lastIndexOf('/') + 1;
        this.portfolioImgName = this.Model[0].portFolioImageName[i].substr(portfolioLength);
this.Model[0].portFolioImages.push(this.portfolioImgName);
      }
    }, error => {
      console.log(error);
    });
  }
  allImages() {
    this.showAll = true;
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showPortFolio = false;
    this.changePrime = false;
  }
  productImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = true;
    this.showAll = false;
    this.changePrime = false;
    this.showPortFolio = false;
  }
  ecommerceImage() {
    this.showEcommerce = true;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.changePrime = false;
    this.showPortFolio = false;
  }
  portraitImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = true;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
    this.changePrime = false;
  }
  profileImage() {
    this.showEcommerce = false;
    this.showProfile = true;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
    this.changePrime = false;
  }
  portFolioImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = true;
    this.changePrime = false;
  }
  deleteEcomImage(images, modelname) {
    const str = images;
    const strlen = str.length;
    const imageName = str.substring(str.lastIndexOf('/') + 1);
    this.modelService.deleteEcomImg(this.serviceProviderName, this.modelId, imageName, modelname).subscribe(data => {
      this.Model = data;
      this.modelecomLength = this.Model[0].ecommerceImageName.length - 1;
      for  (let i = 0 ; i <= this.modelecomLength ; i++ ) {
        const ecomLength = this.Model[0].ecommerceImageName[i].lastIndexOf('/') + 1;
        this.ecommImgName = this.Model[0].ecommerceImageName[i].substr(ecomLength);
this.Model[0].ecommerceImages.push(this.ecommImgName);
      }
      // prod
      this.modelproductLength = this.Model[0].productImageName.length - 1;
      for  (let i = 0 ; i <= this.modelproductLength ; i++ ) {
        const prodLength = this.Model[0].productImageName[i].lastIndexOf('/') + 1;
        this.productImgName = this.Model[0].productImageName[i].substr(prodLength);
this.Model[0].productImages.push(this.productImgName);
      }
      // portfolio
      this.modelportfolioLength = this.Model[0].portFolioImageName.length - 1;
      for  (let i = 0 ; i <= this.modelportfolioLength ; i++ ) {
        const portfolioLength = this.Model[0].portFolioImageName[i].lastIndexOf('/') + 1;
        this.portfolioImgName = this.Model[0].portFolioImageName[i].substr(portfolioLength);
this.Model[0].portFolioImages.push(this.portfolioImgName);
      }
    }, error => {
      console.log(error);
    });
  }
  deleteProdImage(images, modelname) {
    const str = images;
    const strlen = str.length;
    const imageName = str.substring(str.lastIndexOf('/') + 1);
    this.modelService.deleteProdImg(this.serviceProviderName, this.modelId, imageName, modelname).subscribe(data => {
      this.Model = data;
      this.modelecomLength = this.Model[0].ecommerceImageName.length - 1;
      for  (let i = 0 ; i <= this.modelecomLength ; i++ ) {
        const ecomLength = this.Model[0].ecommerceImageName[i].lastIndexOf('/') + 1;
        this.ecommImgName = this.Model[0].ecommerceImageName[i].substr(ecomLength);
this.Model[0].ecommerceImages.push(this.ecommImgName);
      }
      // prod
      this.modelproductLength = this.Model[0].productImageName.length - 1;
      for  (let i = 0 ; i <= this.modelproductLength ; i++ ) {
        const prodLength = this.Model[0].productImageName[i].lastIndexOf('/') + 1;
        this.productImgName = this.Model[0].productImageName[i].substr(prodLength);
this.Model[0].productImages.push(this.productImgName);
      }
      // portfolio
      this.modelportfolioLength = this.Model[0].portFolioImageName.length - 1;
      for  (let i = 0 ; i <= this.modelportfolioLength ; i++ ) {
        const portfolioLength = this.Model[0].portFolioImageName[i].lastIndexOf('/') + 1;
        this.portfolioImgName = this.Model[0].portFolioImageName[i].substr(portfolioLength);
this.Model[0].portFolioImages.push(this.portfolioImgName);
      }
    }, error => {
      console.log(error);
    });
  }
  deletePortImage(images) {
    const str = images;
    const strlen = str.length;
    const imageName = str.substring(str.lastIndexOf('/') + 1);
    this.modelService.deletePortImg(this.serviceProviderName, this.modelId, imageName).subscribe(data => {
      // this.Model.push(data);
    }, error => {
      console.log(error);
    });
  }
  deletePortFolioImage(images, modelname) {
    const str = images;
    const strlen = str.length;
    const imageName = str.substring(str.lastIndexOf('/') + 1);
    this.modelService.deletePortFolioImg(this.serviceProviderName, this.modelId, imageName, modelname).subscribe(data => {
      this.Model = data;
      this.modelecomLength = this.Model[0].ecommerceImageName.length - 1;
      for  (let i = 0 ; i <= this.modelecomLength ; i++ ) {
        const ecomLength = this.Model[0].ecommerceImageName[i].lastIndexOf('/') + 1;
        this.ecommImgName = this.Model[0].ecommerceImageName[i].substr(ecomLength);
this.Model[0].ecommerceImages.push(this.ecommImgName);
      }
      // prod
      this.modelproductLength = this.Model[0].productImageName.length - 1;
      for  (let i = 0 ; i <= this.modelproductLength ; i++ ) {
        const prodLength = this.Model[0].productImageName[i].lastIndexOf('/') + 1;
        this.productImgName = this.Model[0].productImageName[i].substr(prodLength);
this.Model[0].productImages.push(this.productImgName);
      }
      // portfolio
      this.modelportfolioLength = this.Model[0].portFolioImageName.length - 1;
      for  (let i = 0 ; i <= this.modelportfolioLength ; i++ ) {
        const portfolioLength = this.Model[0].portFolioImageName[i].lastIndexOf('/') + 1;
        this.portfolioImgName = this.Model[0].portFolioImageName[i].substr(portfolioLength);
this.Model[0].portFolioImages.push(this.portfolioImgName);
      }
    }, error => {
      console.log(error);
    });
  }
  changePrimeImage() {
    this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
    this.showPortFolio = false;
    this.changePrime = true;
  }

  changePrimeImages() {
this.message = 'Prime Image changed';
    this.spName = this.localStorageService.retrieve('userName');
    this.spCompanyName = this.localStorageService.retrieve('companyName');
    this.spId = this.localStorageService.retrieve('id');
    this.editModel = new EditModel();
    this.editModel.serviceProviderId = this.spId;
    this.editModel.serviceProviderCompanyName = this.spCompanyName;
    this.editModel.serviceProviderName = this.spName;
    this.editModel.userName = this.modelName;
    this.editModel.primeImage = this.primeImageData.primeImage.name;
    this.editModel.modelId = this.modelId;
    this.modelService.editprimeImage(this.primeImageData, this.modelName, this.spName).subscribe(data => {
       this.showProfile = true;
    }, error => {
      console.log(error);
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
   /*  this.router.navigate(['/navheader/models']); */
   /*  this.findImages(); */
    this.showProfile = true;
    this.changePrime = false;
  }
  // update profile details
  update(id) {
    this.modelId = id;
    this.router.navigate(['/navheader/model', this.modelId]);
  }
}
