import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import {VideoPortfolioService} from '../video-portfolio.service';
import {VideoSuperCategory} from '../super-category-video/video-super-category.model';
import {VideoMainCat} from './main-category-video.model';
import {VideoCategory} from './video-portfolio.model';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html',
  styleUrls: ['./add-videos.component.css']
})
export class AddVideosComponent implements OnInit {
  addModelForm: FormGroup;
  superCategoryDetail: VideoSuperCategory [];
  headerCatSelectedData;
  headCatSelected;
  mainCat: VideoSuperCategory [];
  category: VideoCategory;
  message;
  action;
  maincategoryname;
  supercategoryname;
  imageName;
  tempArr;
  constructor(private fb: FormBuilder, private router: Router,
   private localStorageService: LocalStorageService, public snackBar: MatSnackBar,
   private videoPortfolioService: VideoPortfolioService ) { }

  ngOnInit() {
    this.createForm();
    this.superCategory();
  }
  createForm() {
    this.addModelForm = this.fb.group({
      modelName: ['', Validators.required],
      videosUrl: ['', Validators.required],
      position: [''],
      modelId: [''],
      ID: ['']
    });
  }

  superCategory() {
    this.videoPortfolioService.showSuperCategoryOnSub().subscribe(name => {
      this.superCategoryDetail = name;
    }, error => {
      console.log(error);
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
      const obj = this.superCategoryDetail.find(o => o._id === id);
this.supercategoryname = obj.categoryName;
    this.videoPortfolioService.showMainCategoryOnSub(id).subscribe(data => {
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
    this.message = 'video added';
    this.category = new VideoCategory();
    this.category.videoName = addModelForm.controls.modelName.value;
    this.category.videosUrl = addModelForm.controls.videosUrl.value;
    this.videoPortfolioService.addCategory( mainCat, subcat, cat , this.category).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.router.navigate(['/navheader/viewvideo']);
  }

}
