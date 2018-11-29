import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {OurWorkService} from '../our-work.service';
import {SuperCategory} from '../super-category/super-category.model';
import {MainCategory} from './main-category.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
  showEdit: boolean;
  mainCategoryForm: FormGroup;
  showDetails: Boolean = false;
  Categoryname: SuperCategory[] = [];
  mainModel: MainCategory;
  mainCategories: MainCategory[] = [];
  mainCat: MainCategory[] = [];
  headerCatSelectedData;
  headCatSelected;
  showMaincat: Boolean ;
  message;
  action;

  supCatId;
  constructor(private fb: FormBuilder, private router: Router, private workservice: OurWorkService ,
    private snackBar: MatSnackBar
   ) { }

  ngOnInit() {
    this.createForm();
    /* this.getCategory(this.id); */
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
    this.workservice.findDetail().subscribe(name => {
      this.Categoryname = name;
    }, error => {
      console.log(error);
    });
  }
  setNewUser(id) {
   /*  console.log(id); */
  this.headerCatSelectedData = id;
}
getCategory(id) {
  this.showMaincat  = true;
this.headCatSelected = id;
this.workservice.showMainCategoryDetails(this.headCatSelected).subscribe(data => {
  this.mainCat = data[0].mainCategory;
  console.log(this.mainCat);
}, error => {
  console.log(error);
});
}
  save(mainCategoryForm: FormGroup, superCat: any) {
    this.message = 'Sub category added';
    this.showDetails = true;
    this.mainModel = new MainCategory(
      superCat,
      mainCategoryForm.controls.mainCategoryName.value,
    );
    /* mainCategoryForm.reset(); */
    this.workservice.addMainCategory(this.mainModel).subscribe(data => {
      this.mainCategories = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  delete(editCategoryForm: FormGroup, supId: any, mainCatId: any) {
    this.workservice.deleteMainCategory(supId.value, mainCatId.value).subscribe(data => {
      this.mainCat = data[0].mainCategory;
      this.showEdit = !this.showEdit;
     }, error => {
       console.log(error);
     } );
  }

  update(editCategoryForm: FormGroup, supId: any, mainCatId: any, mainCatName: any, mainCatDesc: any) {
    this.supCatId = supId.value;
    this.mainModel = new MainCategory(
       mainCatId.value,
       mainCatName.value,
     );
      this.workservice.editMainCategory(supId.value, this.mainModel).subscribe(data => {
       this.mainCat = data[0].mainCategory;
        console.log(data);
      },
       error => {
        console.log(error);
      }
    );
    }
}
