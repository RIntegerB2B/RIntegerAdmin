import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';

import {ModelManagementService} from '../model-management.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
serviceProviderName;
modelId;

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute, private modelService: ModelManagementService) {
this.serviceProviderName = this.activatedRoute.snapshot.paramMap.get('name');
this.modelId = this.activatedRoute.snapshot.paramMap.get('id');

    }

  ngOnInit() {
    this.findImages();
  }

  findImages() {
    this.modelService.findImages(this.serviceProviderName, this.modelId).subscribe(data => {
console.log(data);
    }, error => {
console.log(error);
    });
  }
}
