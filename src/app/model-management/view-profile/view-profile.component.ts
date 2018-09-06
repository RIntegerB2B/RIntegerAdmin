import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';

import { ModelManagementService } from '../model-management.service';
import { Model } from '../add-model/model.model';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  serviceProviderName;
  modelId;
  Model: Model[] = [];
  viewProfileForm: FormGroup;
  showEcommerce: boolean;
  showPortrait: boolean;
  showProduct: boolean;
  showProfile: boolean;
  showAll: boolean;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute, private modelService: ModelManagementService) {
    this.serviceProviderName = this.activatedRoute.snapshot.paramMap.get('name');
    this.modelId = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.findImages();
    this.createForm();
    this.showAll = true;
  }
  createForm() {
    this.viewProfileForm = this.fb.group({
      prodImgId: [''],
      ecomImgId: [''],
      porImgId: ['']
    });
  }
  findImages() {
    this.modelService.findImages(this.serviceProviderName, this.modelId).subscribe(data => {
      this.Model.push(data);
      console.log(this.Model);
    }, error => {
      console.log(error);
    });
  }
  allImages() {
    this.showAll = true;
    this.showEcommerce = false;
this.showProfile = false;
this.showPortrait = false;
this.showProduct = false;
  }
  productImage() {
this.showEcommerce = false;
this.showProfile = false;
this.showPortrait = false;
this.showProduct = true;
this.showAll = false;
  }
  ecommerceImage() {
    this.showEcommerce = true;
    this.showProfile = false;
    this.showPortrait = false;
    this.showProduct = false;
    this.showAll = false;
      }
      portraitImage() {
        this.showEcommerce = false;
    this.showProfile = false;
    this.showPortrait = true;
    this.showProduct = false;
    this.showAll = false;
      }
      profileImage() {
        this.showEcommerce = false;
        this.showProfile = true;
        this.showPortrait = false;
        this.showProduct = false;
        this.showAll = false;
      }
      deleteEcomImage(images) {
        const str = images;
    const strlen = str.length;
        const  imageName = str.substring(str.lastIndexOf('/') + 1);
      console.log(imageName);
        this.modelService.deleteEcomImg(this.serviceProviderName , this.modelId , imageName).subscribe(data => {
          // this.Model.push(data);
        }, error => {
console.log(error);
        });
  }
  deleteProdImage(images) {
    const str = images;
    const strlen = str.length;
        const  imageName = str.substring(str.lastIndexOf('/') + 1);
this.modelService.deleteProdImg(this.serviceProviderName , this.modelId , imageName).subscribe(data => {
  // this.Model.push(data);
}, error => {
console.log(error);
});
  }
  deletePortImage(images) {
    const str = images;
    const strlen = str.length;
        const  imageName = str.substring(str.lastIndexOf('/') + 1);
this.modelService.deletePortImg(this.serviceProviderName , this.modelId , imageName).subscribe(data => {
  // this.Model.push(data);
}, error => {
console.log(error);
});
      }
}
