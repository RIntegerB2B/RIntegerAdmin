import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import {OurWorkService} from '../our-work.service';
import {SuperCategory} from '../super-category/super-category.model';
import {MainCatDetail} from './category-detail.model';
import {PrimeImageData} from './mainImageData.model';
import {Category} from './category.model';


@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  addModelForm: FormGroup;
  superCategoryDetail: SuperCategory [];
  headerCatSelectedData;
  headCatSelected;
  mainCat: MainCatDetail [];
  category: Category;
  primeImageData: PrimeImageData = new PrimeImageData();
  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  message;
  action;
  maincategoryname;
  supercategoryname;
  imageName;
  tempArr;
  constructor(private fb: FormBuilder, private router: Router,
   private localStorageService: LocalStorageService, public snackBar: MatSnackBar, private workservice: OurWorkService ) { }

  ngOnInit() {
    this.createForm();
    this.superCategory();
  }
  createForm() {
    this.addModelForm = this.fb.group({
      modelName: ['', Validators.required],
      position: [''],
      modelId: [''],
      ID: ['']
    });
  }

  handleFileInput(files: FileList, loadedImage) {
    this.fileToUpload = files.item(0);
   /*  console.log(files[0].name); */
    this.imageName = files[0].name;
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
  superCategory() {
    this.workservice.showSuperCategoryOnSub().subscribe(name => {
      this.superCategoryDetail = name;
    }, error => {
      console.log(error);
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
      const obj = this.superCategoryDetail.find(o => o._id === id);
this.supercategoryname = obj.categoryName;
    this.workservice.showMainCategoryOnSub(id).subscribe(data => {
      this.mainCat = data[0].mainCategory;
      this.tempArr = data[0].mainCategory;
    }, error => {
      console.log(error);
    });

  }
  getCategory(id) {
    this.headCatSelected = id;
    console.log(id);
    const obj1 = this.tempArr.find(o => o._id === id);
    this.maincategoryname = obj1.mainCategoryName;
    console.log(this.maincategoryname);
  }
  save(addModelForm: FormGroup, mainCat: any, subcat: any, cat: any) {
    this.message = 'Category added';
    this.uploadImage( cat);
    this.category = new Category(addModelForm.controls.modelName.value,
      addModelForm.controls.position.value,
      this.imageName
    );
    this.workservice.addCategory( mainCat, subcat, cat , this.category).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.router.navigate(['/navheader/viewportfolio']);
  }

uploadImage( cat ) {
  this.workservice.uploadprimeImage(this.primeImageData, this.supercategoryname, this.maincategoryname, cat).subscribe(data => {
  }, error => {
    console.log(error);
  });
}
}
