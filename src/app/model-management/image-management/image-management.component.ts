import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { ImageData } from './imageData.model';
import { ModelManagementService } from '../model-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css']
})
export class ImageManagementComponent implements OnInit {
  modelImageForm: FormGroup;
  imageData: ImageData = new ImageData();
  fileToUpload; // ecommerce
  fileToUpload1; // portrait
  fileToUpload2; // product
  fileToUpload3; // portfolio
  ecommerceImages = [];
  reader: FileReader = new FileReader();
  imageBlob: Blob;
  imageBytes: Uint8Array;
  loadedImage;
  fileLength;
  id;
  name;
  spName;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
     private modelService: ModelManagementService,
    private activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.name = this.activatedRoute.snapshot.paramMap.get('name');
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.modelImageForm = this.fb.group({
    });
  }

  handleEcommerceInput(images: any, loadedImage) {
    this.fileToUpload = images;
  }


  uploadEcommerce() {
    this.spName = this.localStorageService.retrieve('userName');
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.modelService.uploadecommerceImage(this.spName, this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  handlePortraitInput(images: any, loadedPortrait) {
    this.fileToUpload1 = images;
    console.log(this.fileToUpload1);
  }
  uploadPortrait() {
    this.spName = this.localStorageService.retrieve('userName');
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload1.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload1[i]);
    }
    this.modelService.uploadeportraitImage(this.spName, this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  handleProductInput(images: any, loadedProduct) {
    this.fileToUpload2 = images;
    }


  uploadProduct() {
    this.spName = this.localStorageService.retrieve('userName');
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload2.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload2[i]);
    }
    this.modelService.uploadeProductImage(this.spName, this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  handlePortFolioInput(images: any, loadedPortFolio) {
    this.fileToUpload3 = images;
    }
    uploadPortFolio() {
      this.spName = this.localStorageService.retrieve('userName');
      const formData: any = new FormData();
      this.fileLength = this.fileToUpload3.length;
      for (let i = 0; i <= this.fileLength; i++) {
        formData.append('uploads[]', this.fileToUpload3[i]);
      }
      this.modelService.uploadePortFolioImage(this.spName, this.id, this.name, formData).subscribe(data => {
      }, error => {
        console.log(error);
      });
    }
  sendImages() {
    this.uploadEcommerce();
    this.uploadPortrait();
    this.uploadProduct();
    this.uploadPortFolio();
  this.modelImageForm.reset();
  }
}
