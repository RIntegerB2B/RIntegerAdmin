import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperCategory } from './super-category.model';
import {OurWorkService} from '../our-work.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-super-category',
  templateUrl: './super-category.component.html',
  styleUrls: ['./super-category.component.css']
})
export class SuperCategoryComponent implements OnInit {

  superCategories: SuperCategory[] = [];
  res;
  superCategoryForm: FormGroup;
 /*  newModel: Edit; */
  userModel: SuperCategory;
  /* deleteModel: Delete; */
  showDetails: Boolean = true;
  showEdit: boolean;
  message;
  action;


  constructor(private fb: FormBuilder, private router: Router, private workservice: OurWorkService, private snackbar: MatSnackBar  ) { }

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

    this.workservice.showCategory().subscribe(name => {

      this.superCategories = name;

    }, error => {
      console.log(error);
    });
  }

  add(superCategoryForm: FormGroup) {
    this.showDetails = true;
    this.userModel = new SuperCategory(

      superCategoryForm.controls.categoryName.value,
    );

    superCategoryForm.reset();
    this.workservice.addCat(this.userModel).subscribe(data => {
     this.superCategories = data;
     /* this.snackbar.open(this.message, this.action {
      duration: 3000,
     }); */
    }, error => {
      console.log(error);
    });
  }

  update(superCategoryForm: FormGroup, cat: any, superCatName: any) {
    this.userModel = new SuperCategory(
     superCatName,
    );
    this.workservice.editCategory(cat, this.userModel).subscribe(data => {
      this.superCategories = data;
    }, error => {
      console.log(error);
    });
  }

  delete(superCategoryForm: FormGroup, cat: SuperCategory) {
    cat.editing = false;
  /*   this.deleteModel = new Delete(
      cat._id
    ); */
    superCategoryForm.reset();

    this.workservice.deleteCategory(cat._id, cat.categoryName).subscribe(data => {
      this.superCategories = data;
    }, error => {
      console.log(error);
    });

  }
}
