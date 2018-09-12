import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import {CatalogListingService} from '../catalog-listing.service';
import {B2BNational} from '../b2bNational.model';

@Component({
  selector: 'app-catalog-listing',
  templateUrl: './catalog-listing.component.html',
  styleUrls: ['./catalog-listing.component.css']
})
export class CatalogListingComponent implements OnInit {
  catalogPlatform: FormGroup;
  b2bNationalModel: B2BNational;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
     private catalogService: CatalogListingService) { }

  ngOnInit() {
    this.createForm();
  }
createForm() {
  this.catalogPlatform = this.fb.group({
    b2bNational: ['']
  });
}
addB2bNational() {
  console.log('test');
  this.b2bNationalModel = new B2BNational(
    this.catalogPlatform.controls.b2bNational.value
  );
  this.catalogService.addB2B(this.b2bNationalModel).subscribe(data => {
    console.log(data);
  }, error => {
    console.log(error);
  });
}
}
