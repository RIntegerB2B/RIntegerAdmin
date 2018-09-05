import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import {AgencyService} from '../agency.service';
import {Agency} from './agency.model';

@Component({
  selector: 'app-view-agency',
  templateUrl: './view-agency.component.html',
  styleUrls: ['./view-agency.component.css']
})
export class ViewAgencyComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService,
  private agencyService: AgencyService) { }

  ngOnInit() {
    this.unapprovedAgency();
  }
unapprovedAgency() {
  this.agencyService.agency().subscribe(data => {
    console.log(data);
  }, error => {
    console.log(error);
  });
}
}
