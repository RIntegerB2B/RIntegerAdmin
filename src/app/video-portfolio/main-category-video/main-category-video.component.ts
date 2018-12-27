import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {VideoPortfolioService} from '../video-portfolio.service';
import {VideoSuperCategory} from '../super-category-video/video-super-category.model';
import {VideoMainCategory} from './main-category-video.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-main-category-video',
  templateUrl: './main-category-video.component.html',
  styleUrls: ['./main-category-video.component.css']
})
export class MainCategoryVideoComponent implements OnInit {
  showEdit: boolean;
  mainCategoryForm: FormGroup;
  showDetails: Boolean = false;
  Categoryname: VideoSuperCategory[] = [];
  mainModel: VideoMainCategory;
  mainCategories: VideoMainCategory[] = [];
  mainCat: VideoMainCategory[] = [];
  headerCatSelectedData;
  headCatSelected;
  showMaincat: Boolean ;
  message;
  action;

  supCatId;
  constructor(private fb: FormBuilder, private router: Router, private videoPortfolioservice: VideoPortfolioService ,
    private snackBar: MatSnackBar
   ) { }

  ngOnInit() {
    this.createForm();
    this.superCategory();
  }
  createForm() {
    this.mainCategoryForm = this.fb.group({
      mainCategoryName: ['', Validators.required],
      mainCategoryDescription: ['', Validators.required],
      ID: [''],
      supID: [''],
      uName: [''],
      uDesc: [''],
      _id: ['']
    });
  }

  editGridRow(cat) {
    cat.editing = true;
  }
  cancel(cat) {
    cat.editing = false;
  }
  superCategory() {
    this.videoPortfolioservice.findDetail().subscribe(name => {
      this.Categoryname = name;
    }, error => {
      console.log(error);
    });
  }
  setNewUser(id) {
  this.headerCatSelectedData = id;
}
getCategory(id) {
  this.showMaincat  = true;
this.headCatSelected = id;
this.videoPortfolioservice.showMainCategoryDetails(this.headCatSelected).subscribe(data => {
  this.mainCat = data[0].mainCategory;
  console.log(this.mainCat);
}, error => {
  console.log(error);
});
}
  save(mainCategoryForm: FormGroup, superCat: any) {
    this.message = 'Sub category added';
    this.showDetails = true;
    this.mainModel = new VideoMainCategory(
      superCat,
      mainCategoryForm.controls.mainCategoryName.value,
    );
    /* mainCategoryForm.reset(); */
    this.videoPortfolioservice.addMainCategory(this.mainModel).subscribe(data => {
      this.mainCategories = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  delete(editCategoryForm: FormGroup, supId: any, mainCatId: any) {
    this.videoPortfolioservice.deleteMainCategory(supId.value, mainCatId.value).subscribe(data => {
      this.mainCat = data[0].mainCategory;
      this.showEdit = !this.showEdit;
     }, error => {
       console.log(error);
     } );
  }

  update(editCategoryForm: FormGroup, supId: any, mainCatId: any, mainCatName: any, mainCatDesc: any) {
    this.supCatId = supId.value;
    this.mainModel = new VideoMainCategory(
       mainCatId.value,
       mainCatName.value,
     );
      this.videoPortfolioservice.editMainCategory(supId.value, this.mainModel).subscribe(data => {
       this.mainCat = data[0].mainCategory;
        console.log(data);
      },
       error => {
        console.log(error);
      }
    );
    }
}
