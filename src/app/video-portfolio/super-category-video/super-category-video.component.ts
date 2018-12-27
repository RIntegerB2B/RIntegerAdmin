import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoSuperCategory } from './video-super-category.model';
import {VideoPortfolioService} from '../video-portfolio.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-super-category-video',
  templateUrl: './super-category-video.component.html',
  styleUrls: ['./super-category-video.component.css']
})
export class SuperCategoryVideoComponent implements OnInit {

  superCategories: VideoSuperCategory[] = [];
  res;
  superCategoryForm: FormGroup;
 /*  newModel: Edit; */
  userModel: VideoSuperCategory;
  /* deleteModel: Delete; */
  showDetails: Boolean = true;
  showEdit: boolean;
  message;
  action;


  constructor(private fb: FormBuilder, private router: Router, private videoService: VideoPortfolioService,
    private snackbar: MatSnackBar  ) { }

  ngOnInit() {
    this.createForm();
    this.category();
  }

  createForm() {
    this.superCategoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      uName: [],
      uDesc: [],
      _id: []

    });
  }
  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  editGridRow(cat) {
    this.superCategories.map(category => {
      cat.editing = false;
    });
    cat.editing = true;
  }

  cancel(cat) {
    cat.editing = false;
  }
  category() {

    this.videoService.showCategory().subscribe(name => {

      this.superCategories = name;

    }, error => {
      console.log(error);
    });
  }

  add(superCategoryForm: FormGroup) {
    this.showDetails = true;
    this.userModel = new VideoSuperCategory(

      superCategoryForm.controls.categoryName.value,
    );

    superCategoryForm.reset();
    this.videoService.addCat(this.userModel).subscribe(data => {
     this.superCategories = data;
     /* this.snackbar.open(this.message, this.action {
      duration: 3000,
     }); */
    }, error => {
      console.log(error);
    });
  }

  update(superCategoryForm: FormGroup, cat: any, superCatName: any) {
    this.userModel = new VideoSuperCategory(
     superCatName,
    );
    this.videoService.editCategory(cat, this.userModel).subscribe(data => {
      this.superCategories = data;
    }, error => {
      console.log(error);
    });
  }

  delete(superCategoryForm: FormGroup, cat: VideoSuperCategory) {
    cat.editing = false;
    superCategoryForm.reset();

    this.videoService.deleteCategory(cat._id, cat.categoryName).subscribe(data => {
      this.superCategories = data;
    }, error => {
      console.log(error);
    });

  }
}
