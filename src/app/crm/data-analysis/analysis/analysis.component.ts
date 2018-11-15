import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {Notification} from './subscribed.model';
import {DataAnalysisService} from '../data-analysis.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  arrayBuffer: any;
  file: File;
  subscribedDetailsForm: FormGroup;
  subscribed: Notification[] = [];
  @ViewChild('myTable') table: any;
  mobileNumbers;
  selectedMobileNumbers = [];
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  constructor(private fb: FormBuilder, private analysisService: DataAnalysisService,
    private http: HttpClient) { }
  ngOnInit() {
    this.createForm();
    this.getOnlySubscribed();
  }

  updateFilter(event) {
    // this.showData = true;
    const val = event.target.value.toLowerCase();
    /* if (this.dataSource.length !== 0) { */
    const filterCustomer = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    filterCustomer.splice(filterCustomer.length - 1);

    console.log(filterCustomer);
    if (!filterCustomer.length) {
      return;
    }
    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= filterCustomer.length; i++) {
        const column = filterCustomer[i];
        console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.subscribed = rows;
    this.table.offset = 0;
  }
  changePageLimit(limit: any) {
    this.currentPageLimit = parseInt(limit, 10);
  }
  onLimitChange(limit: any) {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
      }
    });
  }

  createForm() {
    this.subscribedDetailsForm = this.fb.group({
    });
  }
  getOnlySubscribed() {
    this.analysisService.onlySubscribed().subscribe(data => {
      this.subscribed = data;
      console.log(data);
            /* this.temp = [...data]; */
      this.temp = data;
    }, error => {
      console.log(error);
    });
  }
}
