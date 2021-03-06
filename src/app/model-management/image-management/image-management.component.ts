import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { ImageData } from './imageData.model';
import { ModelManagementService } from '../model-management.service';
import { ActivatedRoute } from '@angular/router';
import { NavheaderService } from '../../nav-header/nav-header.service';


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
  fileLength1;
  id;
  name;
  spName;
  ecomImagesPreview = [];

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private navheaderService: NavheaderService,
    private modelService: ModelManagementService,
    private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
  }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
  }

  createForm() {
    this.modelImageForm = this.fb.group({
    });
  }

  handleEcommerceInput(images: any, loadedImage) {
    this.fileToUpload = images;
    /* const ecomFiles = images;
    if (ecomFiles) {
      for (const files of ecomFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.ecomImagesPreview.push(e.target.result);
        };
        reader.readAsDataURL(files);
      }
    } */
  }
  test(value) {
    const fileResultData = value.result;
    console.log('test data', this.imageData);
  }
checkEcomm() {
  const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
   this.spName = this.localStorageService.retrieve('userName');
   this.modelService.checkEcommerceImage( formData, this.id, this.spName).subscribe(data => {
  }, error => {
    console.log(error);
  });
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
  handleBannerInput(images: any, loadedImage) {
    this.fileToUpload = images;
  }
  uploadBanner() {
   /*  this.name = 'banner';
    this.banner = new Banner(
      bannerName,
      bannerImage
    ); */
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
   /*  this.modelService.createBanner(this.banner).subscribe(data => {
      console.log(data);
    }); */
    this.modelService.uploadeBannerImage(this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }

  handlePortraitInput(images: any, loadedPortrait) {
    this.fileToUpload1 = images;
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
    this.modelService.uploadProductImage(this.spName, this.id, this.name, formData).subscribe(data => {
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
    this.fileLength1 = this.fileToUpload3.length;
    console.log(this.fileLength1);
    for (let i = 0; i <= this.fileLength1; i++) {
      formData.append('uploads[]', this.fileToUpload3[i]);
    }
    this.modelService.uploadePortFolioImage(this.spName, this.id, this.name, formData).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  sendImages() {
    if (this.fileToUpload !== undefined && this.fileToUpload3 === undefined && this.fileToUpload2 === undefined) {
      this.uploadEcommerce();
    } else if (this.fileToUpload3 !== undefined && this.fileToUpload === undefined && this.fileToUpload2 === undefined) {
      this.uploadPortFolio();
    } else if (this.fileToUpload2 !== undefined && this.fileToUpload === undefined && this.fileToUpload3 === undefined) {
      this.uploadProduct();
    } else if (this.fileToUpload !== null && this.fileToUpload3 !== null && this.fileToUpload2 === undefined) {
      this.uploadEcommerce();
      this.uploadPortFolio();
    } else if (this.fileToUpload2 !== null && this.fileToUpload3 !== null && this.fileToUpload === undefined) {
      this.uploadProduct();
      this.uploadPortFolio();
    } else if (this.fileToUpload !== null && this.fileToUpload2 !== null && this.fileToUpload3 === undefined) {
      this.uploadEcommerce();
      this.uploadProduct();
    } else if (this.fileToUpload !== null && this.fileToUpload3 !== null && this.fileToUpload2 !== null) {
      this.uploadEcommerce();
      this.uploadPortFolio();
      this.uploadProduct();
    }
    this.modelImageForm.reset();
    this.router.navigate(['/navheader/models']);
    /*  this.uploadPortrait();*/
   /*  this.uploadProduct(); */
  }
}
