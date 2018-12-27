import { Component, OnInit, Inject, DoCheck, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {OurWorkService} from '../our-work.service';
import {MainCatDetail} from '../add-images/category-detail.model';
import {SuperCategory} from '../super-category/super-category.model';
import {MainCatOnSub} from '../add-images/main-category.model';
import {ImageDetails} from './image-detail.model';



@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {
  viewPortfolioForm: FormGroup;
  mainCat: MainCatDetail [];
  mainCategoryData: MainCatOnSub;
  categoryDetail: MainCatDetail;
  superCategoryDetail: SuperCategory [];
  headerCatSelectedData;
  headCatSelected;
  categoryId;
  details: ImageDetails;
  maincatdetails;
  supercategoryname;
  maincategoryname;
  constructor(private fb: FormBuilder, private router: Router, private workservice: OurWorkService) { }

  ngOnInit() {
    this.createForm();
    this.superCategory();

  }
  createForm() {
    this.viewPortfolioForm = this.fb.group({
      ID: [''],
    });
  }
  superCategory() {
    this.workservice.showSuperCategoryOnSub().subscribe(name => {
      this.superCategoryDetail = name;
     /*  console.log('test2', name); */
      /* console.log(name); */
    }, error => {
      console.log(error);
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.workservice.showMainCategoryOnSub(id).subscribe(data => {
      this.mainCat = data[0].mainCategory;
    }, error => {
      console.log(error);
    });

  }
  getCategory(id) {
    this.headCatSelected = id;
    this.workservice.showMainCategory(this.headerCatSelectedData, id).subscribe(data => {
      this.mainCategoryData = data.category;
     /*  console.log('category', data.category[0]._id); */
      this.categoryId =  data.category[0]._id;
    }, error => {
      console.log(error);
    });

  }

  addMultiple(id) {
    this.router.navigate(['/navheader/addmultiple', this.headerCatSelectedData, 'maincategory', this.headCatSelected ,
     'category', id ]);
  }
  viewMultiple(id) {
    const obj = this.superCategoryDetail.find(o => o._id === this.headerCatSelectedData );
 this.supercategoryname = obj.categoryName;
    const obj1 = this.mainCat.find(o => o._id === this.headCatSelected );
    this.maincategoryname = obj1;
    this.router.navigate(['/navheader/view', this.headerCatSelectedData, 'main', this.headCatSelected ,
     'cat', id , 'name', this.supercategoryname, 'subname', this.maincategoryname.mainCategoryName]);
  }
  deleteCategory(id) {
    this.workservice.removeCategory(this.headerCatSelectedData, this.headCatSelected, id).subscribe(data => {
      console.log(data);
      this.mainCategoryData = data.category;
       this.categoryId =  data.category[0]._id;
    }, err => {
      console.log(err);
    });
  }
}
