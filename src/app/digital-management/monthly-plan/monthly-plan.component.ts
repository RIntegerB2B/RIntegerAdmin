import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { NavheaderService } from '../../nav-header/nav-header.service';
import { DigitalManagementService } from '../digital-management.service';
import { AddMonthlyPlan } from './monthlyplan.model';
import {DigitalMgmtStatus} from './digital-mgmt.status.model';

@Component({
  selector: 'app-monthly-plan',
  templateUrl: './monthly-plan.component.html',
  styleUrls: ['./monthly-plan.component.css']
})
export class MonthlyPlanComponent implements OnInit {
  selectedWeek2: any;
  selectedYear2: any;
  selectedMonth2: any;
  showYear2: boolean;
  showForms2: boolean;
  no;
  isLinear = false;
  showForms: boolean;
  showYear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  monthlyPlanModel: AddMonthlyPlan;
  Status: DigitalMgmtStatus;
  WeeklyStatus: DigitalMgmtStatus;
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  year = ['2018', '2019', '2020'];
  week = ['Week1', 'Week2', 'Week3', 'Week4'];
  selectedMonth;
  selectedYear;
  selectedWeek;
  status = ['Planned', 'Started', 'Progress' , 'Completed', 'Pending' , 'Cancel'];
  constructor(private _formBuilder: FormBuilder, private navheaderService: NavheaderService,
    private digitalMgmtService: DigitalManagementService, private activatedRoute: ActivatedRoute) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
  }
  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.firstFormGroup = this._formBuilder.group({
      title: [''],
      Description: [''],
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
  selectMonth(val1) {
    this.selectedMonth = val1;
    console.log(val1);
    this.showYear = true;
  }
  selectYear(val) {
    this.selectedYear = val;
    this.viewMonthlyPlan();
  }
  selectWeek(id1,  monthid2 , val2) {
    this.selectedWeek = val2;
    console.log(val2);
    this.digitalMgmtService.copyToWeeklyPlan(id1, monthid2, val2).subscribe(data => {
      this.Status = data;
    }, error => {
      console.log(error);
    });
  }
  showForm() {
    this.showForms = true;
  }
viewMonthlyPlan() {
  this.digitalMgmtService.viewMonthlyPlan(this.no, this.selectedMonth, this.selectedYear).subscribe(data => {
    this.Status = data;
  }, error => {
    console.log(error);
  });
}
  save(firstFormGroup: FormGroup) {
    this.monthlyPlanModel = new AddMonthlyPlan();
    this.monthlyPlanModel.monthName = this.selectedMonth;
    this.monthlyPlanModel.year = this.selectedYear;
    this.monthlyPlanModel.bookingOrderId = this.no;
    this.digitalMgmtService.addMonth(this.monthlyPlanModel).subscribe(data => {
      this.saveMonthlyPlan(firstFormGroup);
    }, error => {
      console.log(error);
    });
  }
  saveMonthlyPlan(firstFormGroup: FormGroup) {
    this.monthlyPlanModel.planTitle = this.firstFormGroup.controls.title.value;
    this.monthlyPlanModel.planDescription = this.firstFormGroup.controls.Description.value;
    this.monthlyPlanModel.bookingOrderId = this.no;
    this.monthlyPlanModel.monthName = this.selectedMonth;
    this.monthlyPlanModel.year = this.selectedYear;
    this.digitalMgmtService.addMonthlyPlan(this.monthlyPlanModel).subscribe(data => {
      this.Status = data;
    }, error => {
      console.log(error);
    });
  }
  editStatus(id) {
    console.log(id);
  }
  selectStatus( id1,  monthid2 , val) {
this.digitalMgmtService.editMonthlyPlanStatus(id1, monthid2, val).subscribe(data => {
  this.Status = data;
}, error => {
  console.log(error);
});
  }
  showForm2() {
    this.showForms2 = true;
  }
  selectMonth2(val1) {
    this.selectedMonth2 = val1;
    this.showYear2 = true;
  }
  selectYear2(val2) {
    this.selectedYear2 = val2;
  }
  selectWeek2(val) {
    this.selectedWeek2 = val;
    this.viewWeeklyPlan();
  }
  viewWeeklyPlan() {
    this.digitalMgmtService.viewWeeklyPlan(this.no, this.selectedMonth2, this.selectedYear2, this.selectedWeek2).subscribe(data => {
      this.WeeklyStatus = data;
      console.log(this.Status);
    }, error => {
      console.log(error);
    });
  }
}
