import { Component, OnInit , Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { ImageData } from './imageData.model';
import { ActivatedRoute } from '@angular/router';
import {OurWorkService} from '../our-work.service';
/* import {ImageDetails} from '../view-images/image-detail.model'; */
import {MainCatDetail} from '../add-images/category-detail.model';
import {ImageDetails} from './imageDetails.model';
import {PrimeImageData} from '../add-images/mainImageData.model';

@Component({
  selector: 'app-multiple-images',
  templateUrl: './multiple-images.component.html',
  styleUrls: ['./multiple-images.component.css']
})
export class MultipleImagesComponent implements OnInit {
  mulitImageForm: FormGroup;
  imageData: ImageData = new ImageData();
  fileToUpload; // ecommerce
  images = [];
  reader: FileReader = new FileReader();
  imageBlob: Blob;
  imageBytes: Uint8Array;
  loadedImage;
  fileLength;
  id;
  name;
  mainid;
  subid;
  catId;
  supercategoryname;
  maincategoryname;
  categoryname;
  catArr = [];
  temparr;
  imageName = [];
  primeImage;
  details: ImageDetails ;
  primeImageData: PrimeImageData = new PrimeImageData();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
/*   @Input() details: ImageDetails; */
  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute, private workservice: OurWorkService) {
      this.mainid = this.activatedRoute.snapshot.paramMap.get('mainid');
    this.subid = this.activatedRoute.snapshot.paramMap.get('subcatid');
    this.catId = this.activatedRoute.snapshot.paramMap.get('catid');
    }

  ngOnInit() {
    this.createForm();
  this.findDetails();
  }
  createForm() {
    this.mulitImageForm = this.fb.group({
    });
  }
  findDetails() {
    this.workservice.showMainCategoryDetails(this.mainid).subscribe(data => {
const obj = data.find(o => o._id === this.mainid);
this.supercategoryname = obj.categoryName;
/* console.log(this.supercategoryname); */
for (let i = 0; i <= data[0].mainCategory.length - 1; i++) {
if (data[0].mainCategory[i]._id === this.subid ) {
this.maincategoryname = data[0].mainCategory[i].mainCategoryName;
/* console.log(this.maincategoryname); */
for (let j = 0; j <= data[0].mainCategory[i].category.length - 1; j++) {
   this.temparr = data[0].mainCategory[i].category[j];
  if (this.temparr._id === this.catId ) {
  this.categoryname = this.temparr.categoryName;
 /*  console.log(this.categoryname); */
  }
  }
}
}

    }, error => {

    });
  }
  handleImages(images: any, loadedImage) {
    this.fileToUpload = images;
    /* this.checkEcomm(); */
  }
  /* handleFileInput(files: FileList, loadedImage) {
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
  } */
  sendImages() {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength - 1; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
      this.imageName.push(this.fileToUpload[i].name) ;
    }
   /*  console.log(this.imageName); */
    this.workservice.createMultipleImages(this.supercategoryname, this.maincategoryname,
      this.categoryname, this.mainid, this.subid, this.catId, formData).subscribe(data => {
     /*  console.log(data); */
    }, error => {
      console.log(error);
    });
    this.router.navigate(['/navheader/viewportfolio']);
  }

/*   saveImages() {
    this.details = new ImageDetails();
    this.workservice.saveMultipleImages(this.mainid, this.subid,
      this.catId, this.imageName).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  } */
}
