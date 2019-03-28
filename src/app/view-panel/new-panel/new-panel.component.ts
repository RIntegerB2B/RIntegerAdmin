import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-new-panel',
  templateUrl: './new-panel.component.html',
  styleUrls: ['./new-panel.component.css']
})
export class NewPanelComponent implements OnInit {
  search = 'y';
  searchform: FormGroup;
  constructor( private fb: FormBuilder) {
    this.searchform = this.fb.group({
      search: []
    });
   }

  ngOnInit() {
  }

}
