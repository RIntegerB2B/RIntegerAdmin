import { Component, OnInit, Inject, DoCheck, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import {OurWorkService} from '../our-work.service';
import {Category} from '../add-images/category.model';
import {PrimeImageData} from '../add-images/mainImageData.model';
import { error } from 'util';

@Component({
  selector: 'app-view-multiple-images',
  templateUrl: './view-multiple-images.component.html',
  styleUrls: ['./view-multiple-images.component.css']
})
export class ViewMultipleImagesComponent implements OnInit {
  catId: string;
  subid: string;
  mainid: string;
  serviceProviderName;
  modelId;
  viewMultipleForm: FormGroup;
  showProfile: boolean;
  showAll: boolean;
  showMultiple: boolean;
  changePrime: boolean;
  ecommerceImageNames = [];
  name;
  loadedModelName;
  spName;
  spCompanyName;
  spId;
  details: Category;

  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  primeImageData: PrimeImageData = new PrimeImageData();
  modelName;
  message;
  action;
  portfolioImgName;
productImgName;
  ecommImgName;
  primeImageName;
  primeImage;
  mainname;
  subname;
  catname;
  constructor(private fb: FormBuilder, private router: Router, private workservice: OurWorkService,
     private activatedRoute: ActivatedRoute,  private snackBar: MatSnackBar) {
      this.mainid = this.activatedRoute.snapshot.paramMap.get('mainid');
      this.subid = this.activatedRoute.snapshot.paramMap.get('subcatid');
      this.catId = this.activatedRoute.snapshot.paramMap.get('catid');
      this.mainname = this.activatedRoute.snapshot.paramMap.get('name');
      this.subname = this.activatedRoute.snapshot.paramMap.get('sub');
      }

  ngOnInit() {
    this.createForm();
    this.findImages();
    this.showProfile = true;
  }
  createForm() {
    this.viewMultipleForm = this.fb.group({
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
    this.primeImage = files[0].name;
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
 this.workservice.showMultipleImages(this.mainid, this.subid,
  this.catId).subscribe(data => {
    /* console.log('db', data); */
    this.catname = data.categoryName;
    this.details = data.images;
    this.primeImageName =  data.primeImage;
}, err => {
  console.log(err);
});
  }
  profileImage() {
  /*   this.primeImageName = this.details.primeImage;
    console.log(this.primeImageName); */
    this.showMultiple = false;
    this.showProfile = true;
    this.changePrime = false;
  }

  multiImage() {
    this.showMultiple = true;
    this.showProfile = false;
    this.changePrime = false;
  }
  changePrimeImage() {
    this.showMultiple = false;
    this.showProfile = false;
    this.changePrime = true;
  }
  deleteImage(image) {
   const nameLength =  image.lastIndexOf('/') + 1;
   const imagename = image.substr(nameLength);
/*    console.log(imagename); */
    this.workservice.deleteMultipleImages(this.mainid, this.subid, this.catId, imagename).subscribe(data => {
      this.details = data.images;
    } , err => {
      console.log(err);
    });
  }
  updatePrimeImages() {
    this.message = 'Prime Image has changed';
this.workservice.updatePrimeImage(this.primeImageData, this.mainid, this.subid, this.catId,
   this.mainname, this.subname, this.catname).subscribe(data => {
    this.catname = data.categoryName;
    this.details = data.images;
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
}, err => {
  console.log(err);
});
  }
}
