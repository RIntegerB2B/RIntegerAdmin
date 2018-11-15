import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
/* import {
  default as _rollupMoment, Moment } from 'moment';
 */
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
import {
  Moment
} from 'moment';

import { NavheaderService } from '../../nav-header/nav-header.service';
import { DigitalManagementService } from '../digital-management.service';
import { AddMonthlyPlan } from './monthlyplan.model';
import { DigitalMgmtStatus } from './digital-mgmt.status.model';
import { WeeklyPlan } from './weeklyplan.model';
import { DailyPlan } from './dailyplan.model';
import { NewMonthlyPlan } from './new-month.model';
import { Notification } from '../../shared/notification.model';

@Component({
  selector: 'app-monthly-plan',
  templateUrl: './monthly-plan.component.html',
  styleUrls: ['./monthly-plan.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MonthlyPlanComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  monthToString: any;
  monthToString2: any;
  yearToString: any;
  showEditing3: boolean;
  selectedYear3: any;
  showYear3: boolean;
  selectedMonth3: any;
  showForms3: boolean;
  selectedWeek2: any;
  selectedYear2: any;
  selectedMonth2: any;
  showYear2: boolean;
  showForms2: boolean;
  no;
  isLinear = true;
  showForms: boolean;
  showYear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  monthlyPlanModel: AddMonthlyPlan;
  Status: DigitalMgmtStatus[];
  WeeklyStatus: DigitalMgmtStatus[];
  DailyStatus: DigitalMgmtStatus[];
  WeeklyModel: WeeklyPlan;
  DailyModel: DailyPlan;
  showAdd: boolean;
  showEditing: boolean;
  showEditing2: boolean;
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  year = ['2018', '2019', '2020'];
  week = ['Week1', 'Week2', 'Week3', 'Week4'];
  selectedMonth;
  selectedYear;
  selectedWeek;
  selected = 'All';
  status = ['Planned', 'Started', 'Progress', 'Pending', 'Cancel', 'Completed', 'Update'];
  message;
  action;
  noresult = false;
  selectedMonthName;
  selectedYearName;
  monthName;
  yearValue;
  date = new FormControl(moment());
  ctrlValue;
  newMonthModel: NewMonthlyPlan;
  montherror: boolean;
  titleToSent;
  title;
  allowMonth = false;
  notificationBody;
  hideData: number;
  notificationModel: Notification;
  mobileNo;
  montherror1: boolean;
  montherror2: boolean;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;
  array: any;
  /*   showDays = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
     '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
     , '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
     show30Days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
     '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
     , '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']; */
  constructor(private _formBuilder: FormBuilder, private navheaderService: NavheaderService,
    private digitalMgmtService: DigitalManagementService, private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
    this.mobileNo = this.activatedRoute.snapshot.paramMap.get('mobileno');
  }
  ngOnInit() {
    console.log(window.innerWidth);
    this.navheaderService.makeMenuTransparent();
    this.firstFormGroup = this._formBuilder.group({
      _id: [''],
      monthId: [''],
      title: [''],
      Description: [''],
      updTitle: [''],
      updDesc: [''],
      tempmonth: [''],
      tempyear: [''],
      newdate: ['', Validators.required],
      monthName: ['',  Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      _id: [''],
      weekId: [''],
      title1: [''],
      Description1: [''],
      updTitle1: [''],
      updDesc1: [''],
      date: [''],
      updWeek1: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      _id: [''],
      dateID: [''],
      title2: [''],
      Description2: [''],
      updTitle2: [''],
      updDesc2: [''],
      dailydate: [''],
      copyToDate: [''],
    });
  }
  chosenYearHandler(normlizedMonth: Moment) {
    this.yearValue = moment(normlizedMonth).year();
    this.yearToString = this.yearValue.toString();
    console.log(this.yearToString);
  }
  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.ctrlValue = moment(normlizedMonth).month();
    this.monthToString = this.ctrlValue.toString();
    /*   console.log('calendar month', this.monthToString); */
    switch (this.ctrlValue) {
      case 0: {
        this.monthName = 'January';
        break;
      }
      case 1: {
        this.monthName = 'February';
        break;
      }
      case 2: {
        this.monthName = 'March';
        break;
      }
      case 3: {
        this.monthName = 'April';
        break;
      }
      case 4: {
        this.monthName = 'May';
        break;
      }
      case 5: {
        this.monthName = 'June';
        break;
      }
      case 6: {
        this.monthName = 'July';
        break;
      }
      case 7: {
        this.monthName = 'August';
        break;
      }
      case 8: {
        this.monthName = 'September';
        break;
      }
      case 9: {
        this.monthName = 'October';
        break;
      }
      case 10: {
        this.monthName = 'November';
        break;
      }
      case 11: {
        this.monthName = 'December';
        break;
      }
    }
    console.log(this.monthName);
    this.firstFormGroup.controls.newdate.setValue(normlizedMonth);
    datepicker.close();
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
  selectWeek(id1, monthid2, val2) {
    this.message = 'Copied to ' + val2;
    this.selectedWeek = val2;
    this.digitalMgmtService.copyToWeeklyPlan(id1, monthid2, val2).subscribe(data => {
      this.Status = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  showForm() {
    this.showForms = true;
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.Status = part;
  }
  viewMonthlyPlan() {
    this.showForms = true;
    this.selectedMonthName = this.monthName;
    this.selectedYearName = this.yearValue;
    this.save();
    this.digitalMgmtService.viewMonthlyPlan(this.no, this.monthName,
      this.yearValue).subscribe(data => {
        this.Status = data;
        if (data.length === 0) {
          this.noresult = true;
        } else {
          this.noresult = false;
        }
      }, error => {
        console.log(error);
      });
    this.viewAllWeeklyPlan();
    this.viewDailyPlan();
  }
  save() {
    this.newMonthModel = new NewMonthlyPlan();
    this.newMonthModel.monthName = this.monthName;
    this.newMonthModel.year = this.yearValue;
    this.newMonthModel.bookingOrderId = this.no;
    this.firstFormGroup.controls.monthName.setValue(this.monthName);
    this.digitalMgmtService.addMonth(this.newMonthModel).subscribe(data => {
      /*   this.saveMonthlyPlan(firstFormGroup); */
      this.monthlyPlanModel = data;
      console.log(this.monthlyPlanModel);
    }, error => {
      console.log(error);
    });
  }
  saveMonthlyPlan(firstFormGroup: FormGroup) {
    this.message = 'Sucessfully added to monthly plan';
    this.monthlyPlanModel = new AddMonthlyPlan();
    this.monthlyPlanModel.planTitle = this.firstFormGroup.controls.title.value;
    this.monthlyPlanModel.planDescription = this.firstFormGroup.controls.Description.value;
    this.monthlyPlanModel.bookingOrderId = this.no;
    this.monthlyPlanModel.monthName = this.monthName;
    this.monthlyPlanModel.year = this.yearValue;
    this.digitalMgmtService.addMonthlyPlan(this.monthlyPlanModel).subscribe(data => {
      this.Status = data;
      if (data.length !== 0) {
        this.noresult = false;
      }
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });

    }, error => {
      console.log(error);
    });
  }
  editTask(val) {
    val.newShowEdit = true;
  }
  updateMonthlyPlan(id, monthId, updatedTitle, updatedDescription) {
    this.monthlyPlanModel = new AddMonthlyPlan();
    this.monthlyPlanModel.planTitle = updatedTitle;
    this.monthlyPlanModel.planDescription = updatedDescription;
    this.digitalMgmtService.editMonthlyPlan(id, monthId, this.monthlyPlanModel).subscribe(data => {
      this.Status = data;
      this.showEditing = false;
    }, error => {
      console.log(error);
    });
  }
  deleteMonthlyPlan(id, monthId) {
    this.digitalMgmtService.deleteMonthlyPlan(id, monthId).subscribe(data => {
      this.Status = data;
      this.showEditing = false;
    }, error => {
      console.log(error);
    });
  }
  cancel(val) {
    val.newShowEdit = false;
  }
  selectStatus(id1, monthid2, val, title) {
    this.message = 'Status Updated to - ' + val;
    this.digitalMgmtService.editMonthlyPlanStatus(id1, monthid2, val).subscribe(data => {
      this.Status = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      if (val === 'Completed') {
        this.titleToSent = 'Activity' + ' ' + title + ' ' + 'completed';
        this.sendNotification(this.mobileNo, this.no, this.titleToSent);
      } else if (val === 'Update') {
        this.titleToSent = 'Activity' + ' ' + title + ' ' + 'will be updated';
        this.sendNotification(this.mobileNo, this.no, this.titleToSent);
      }
    }, error => {
      console.log(error);
    });
  }
  /* goForward(stepper: MatStepper) {
    stepper.next();
  } */
  // weekly plan
  showForm2() {
    this.showForms2 = true;
  }
  /* selectMonth2(val1) {
    this.selectedMonth2 = val1;
    this.showYear2 = true;
  }
  selectYear2(val2) {
    this.selectedYear2 = val2;
  }*/
  selectWeek2(val) {
    this.selectedWeek2 = val;
    this.showAdd = true;
    /*   this.viewWeeklyPlan(); */
  }
  viewAllWeeklyPlan() {
    if (
      this.firstFormGroup.controls.monthName.value === ''
    )      {
      this.allowMonth = true;
    } else {
    this.showForm2();
    this.allowMonth = false;
    this.digitalMgmtService.viewAllWeeklyPlan(this.no, this.monthName,
      this.yearValue).subscribe(data => {
        this.WeeklyStatus = data;
      }, error => {
        console.log(error);
      });
  }
  }
  viewWeeklyPlan() {
    this.digitalMgmtService.viewWeeklyPlan(this.no, this.monthName,
      this.yearValue,
      this.selectedWeek2).subscribe(data => {
        this.WeeklyStatus = data;
      }, error => {
        console.log(error);
      });
  }

  saveWeeklyPlan(secondFormGroup, weekvalue) {
    this.message = 'Sucessfully added to weekly plan';
    this.WeeklyModel = new WeeklyPlan();
    this.WeeklyModel.planTitle = this.secondFormGroup.controls.title1.value;
    this.WeeklyModel.planDescription = this.secondFormGroup.controls.Description1.value;
    this.WeeklyModel.week = weekvalue;
    this.digitalMgmtService.addWeeklyPlan(this.no, this.monthName, this.yearValue, this.WeeklyModel).subscribe(data => {
      this.WeeklyStatus = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.secondFormGroup.reset();
    }, error => {
      console.log(error);
    });
  }
  editTask2(val) {
    val.newShowEditWeek = true;
  }
  cancel2(val) {
    val.newShowEditWeek = false;
  }
  updateWeeklyPlan(id, weekId, updatedTitle, updatedDescription, week) {
    this.WeeklyModel = new WeeklyPlan();
    this.WeeklyModel.planTitle = updatedTitle;
    this.WeeklyModel.planDescription = updatedDescription;
    this.WeeklyModel.week = week;
    this.digitalMgmtService.editWeeklyPlan(id, weekId, this.WeeklyModel).subscribe(data => {
      this.WeeklyStatus = data;
      this.showEditing2 = false;
    }, error => {
      console.log(error);
    });
  }
  deleteWeeklyPlan(id, weekId) {
    this.digitalMgmtService.deleteWeeklyPlan(id, weekId).subscribe(data => {
      this.WeeklyStatus = data;
      this.showEditing2 = false;
    }, error => {
      console.log(error);
    });
  }
  copyToDate(id, weekId, date) {
    this.message = 'Copied to ' + date;
    const value = date.split('/');
    /*  console.log(this.yearToString);
     console.log(this.monthToString);
     console.log(value[2]);
     console.log(value[0] - 1); */
    this.monthToString2 = (value[0] - 1).toString();
    if (this.yearToString !== (value[2]) || this.monthToString !== this.monthToString2) {
      this.montherror = true;
    } else {
      this.montherror = false;
      const MONTH = value[0] - 1;
      this.digitalMgmtService.copyToDailyPlan(id, weekId, value[1]).subscribe(data => {
        this.WeeklyStatus = data;
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }, error => {
        console.log(error);
      });
    }
  }
  selectStatus2(id1, weekid, val, title) {
    this.message = 'Status Updated to - ' + val;
    this.digitalMgmtService.editWeeklyPlanStatus(id1, weekid, val).subscribe(data => {
      this.WeeklyStatus = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      if (val === 'Completed') {
        this.titleToSent = title + ' ' + 'completed';
        this.sendNotification(this.mobileNo, this.no, this.titleToSent);
      } else if (val === 'Update') {
        this.titleToSent = title + ' ' + 'will be updated';
        this.sendNotification(this.mobileNo, this.no, this.titleToSent);
      }
    }, error => {
      console.log(error);
    });
  }

  showForm3() {
    this.showForms3 = true;
  }

  selectMonth3(val1) {
    this.selectedMonth3 = val1;
    this.showYear3 = true;
  }
  selectYear3(val2) {
    this.selectedYear3 = val2;
    this.viewDailyPlan();
    this.showAdd = true;
  }
  viewDailyPlan() {
    if (
      this.firstFormGroup.controls.monthName.value === ''
    )      {
      this.allowMonth = true;
    } else {
    this.showForm3();
    this.allowMonth = false;
    this.digitalMgmtService.viewMonthlyPlan(this.no, this.monthName, this.yearValue).subscribe(data => {
      this.DailyStatus = data;
    }, error => {
      console.log(error);
    });
  }
}
  saveDailyPlan(thirdFormGroup, update) {
    this.message = 'Sucessfully added to daily plan';
    const DATE = update.split('/');
    this.monthToString2 = (DATE[0] - 1).toString();
    this.DailyModel = new DailyPlan();
    this.DailyModel.date = DATE[1];
    if (this.yearToString !== (DATE[2]) || this.monthToString !== this.monthToString2) {
      this.montherror1 = true;
    } else {
      this.montherror1 = false;
      this.DailyModel.planTitle = this.thirdFormGroup.controls.title2.value;
      this.DailyModel.planDescription = this.thirdFormGroup.controls.Description2.value;
      this.digitalMgmtService.addDailyPlan(this.no, this.monthName, this.yearValue, this.DailyModel).subscribe(data => {
        this.DailyStatus = data;
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
        this.thirdFormGroup.reset();
      }, error => {
        console.log(error);
      });
    }
  }

  editTask3(val) {
    val.newShowEditDaily = true;
  }
  cancel3(val) {
    val.newShowEditDaily = false;
  }
  updateDailyPlan(id, dateID, updatedTitle, updatedDescription, daily) {
    this.DailyModel = new DailyPlan();
    this.DailyModel.planTitle = updatedTitle;
    this.DailyModel.planDescription = updatedDescription;
    this.DailyModel.date = daily;
    this.digitalMgmtService.editDailyPlan(id, dateID, this.DailyModel).subscribe(data => {
      this.DailyStatus = data;
      this.showEditing3 = false;
    }, error => {
      console.log(error);
    });
  }
  deleteDailyPlan(id, dateId) {
    this.digitalMgmtService.deleteDailyPlan(id, dateId).subscribe(data => {
      this.DailyStatus = data;
      this.showEditing3 = false;
    }, error => {
      console.log(error);
    });
  }
  selectStatus3(id1, dailyId, val, title) {
    this.message = 'Status Updated to - ' + val;
    this.digitalMgmtService.editDailyPlanStatus(id1, dailyId, val).subscribe(data => {
      this.DailyStatus = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      if (val === 'Completed') {
        this.titleToSent = title + ' ' + 'completed';
        this.sendNotification(this.mobileNo, this.no, this.titleToSent);
      } else if (val === 'Update') {
        this.titleToSent = title + ' ' + 'will be updated';
        this.sendNotification(this.mobileNo, this.no, this.titleToSent);
      }
    }, error => {
      console.log(error);
    });
  }
  copyToAnotherDate(id, dateId, date) {
    this.message = 'Copied to ' + date;
    const value = date.split('/');
    const MONTH = value[0] - 1;
    this.monthToString2 = (value[0] - 1).toString();
    if (this.yearToString !== (value[2]) || this.monthToString !== this.monthToString2) {
      this.montherror2 = true;
    } else {
      this.montherror2 = false;
      this.digitalMgmtService.copyToDayPlan(id, dateId, value[1]).subscribe(data => {
        this.DailyStatus = data;
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }, error => {
        console.log(error);
      });
    }
  }

  sendNotification(mobileNumber, orderId, title) {
    this.title = title;
    this.notificationBody = 'Booking Id ' + orderId;
    this.notificationModel = new Notification(
      mobileNumber,
      this.title,
      this.notificationBody
    );
    this.digitalMgmtService.pushNotification(this.notificationModel).subscribe(data => {
    });
  }
}
