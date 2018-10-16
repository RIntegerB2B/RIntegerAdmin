import { Component, OnInit } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NavheaderService} from '../../nav-header/nav-header.service';

@Component({
  selector: 'app-monthly-plan',
  templateUrl: './monthly-plan.component.html',
  styleUrls: ['./monthly-plan.component.css']
})
export class MonthlyPlanComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private navheaderService: NavheaderService) {}

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.firstFormGroup = this._formBuilder.group({
      title: [''],
      Description: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [''],
      title1: [''],
      Description1: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      title2: [''],
      Description2: ['']
    });
  }

}
