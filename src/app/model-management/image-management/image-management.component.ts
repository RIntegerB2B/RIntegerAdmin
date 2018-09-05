import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  imageBlob: Blob;
  imageBytes: Uint8Array;
  loadedImage;
  loadedPortrait;
  loadedProduct;
  fileLength;
  fileToUpload1: File[] = [];
  fileNames = [];
  id;
  name;
  constructor(private fb: FormBuilder, private router: Router, private modelService: ModelManagementService,
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
    this.uploadEcommerce(this.fileToUpload);
  }


  uploadEcommerce(filesToUpload) {
    const formData: any = new FormData();
    this.fileLength = filesToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', filesToUpload[i]);
    }
    this.modelService.uploadecommerceImage(this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  handlePortraitInput(images: any, loadedPortrait) {
    this.fileToUpload = images;
    this.uploadPortrait(this.fileToUpload);
  }
  uploadPortrait(filesToUpload) {
    const formData: any = new FormData();
    this.fileLength = filesToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', filesToUpload[i]);
    }
    this.modelService.uploadeportraitImage(this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  handleProductInput(images: any, loadedProduct) {
    this.fileToUpload = images;
    this.uploadProduct(this.fileToUpload);
    }


  uploadProduct(filesToUpload) {
    const formData: any = new FormData();
    this.fileLength = filesToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', filesToUpload[i]);
    }
    this.modelService.uploadeProductImage(this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  sendImages() {
  }
}
