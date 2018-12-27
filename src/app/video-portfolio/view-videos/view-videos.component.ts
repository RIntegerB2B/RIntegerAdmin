import { Component, OnInit, Inject, DoCheck, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


import {VideoPortfolioService} from '../video-portfolio.service';
import {MainCatDetail} from '../add-videos/super-category-video.model';
import {VideoSuperCategory} from '../super-category-video/video-super-category.model';
import {VideoDetails} from './view-video.model';

@Component({
  selector: 'app-view-videos',
  templateUrl: './view-videos.component.html',
  styleUrls: ['./view-videos.component.css']
})
export class ViewVideosComponent implements OnInit {
  viewPortfolioForm: FormGroup;
  mainCat: MainCatDetail [];
  mainCategoryData: MainCatDetail;
  categoryDetail: MainCatDetail;
  superCategoryDetail: VideoSuperCategory [];
  headerCatSelectedData;
  headCatSelected;
  categoryId;
  details: VideoDetails;
  maincatdetails;
  supercategoryname;
  maincategoryname;
  constructor(private fb: FormBuilder, private router: Router, private videoPortfolioService: VideoPortfolioService) { }

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
    this.videoPortfolioService.showSuperCategoryOnSub().subscribe(name => {
      this.superCategoryDetail = name;

    }, error => {
      console.log(error);
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.videoPortfolioService.showMainCategoryOnSub(id).subscribe(data => {
      this.mainCat = data[0].mainCategory;
    }, error => {
      console.log(error);
    });

  }
  getCategory(id) {
    this.headCatSelected = id;
    this.videoPortfolioService.showMainCategory(this.headerCatSelectedData, id).subscribe(data => {
      this.mainCategoryData = data.category;
      this.categoryId =  data.category[0]._id;
      console.log('video data', data.category);
    }, error => {
      console.log(error);
    });

  }

  deleteCategory(id) {
    this.videoPortfolioService.removeCategory(this.headerCatSelectedData, this.headCatSelected, id).subscribe(data => {
      console.log(data);
            this.mainCategoryData = data.category;
      /*  this.categoryId =  data.category[0]._id; */
    }, err => {
      console.log(err);
    });
  }
}
