import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  navID;
  admin: boolean;
  serviceProvider: boolean;
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
    this.navID = this.activatedRoute.snapshot.paramMap.get('data');
    console.log(this.navID);
  }

  ngOnInit() {
    if (this.navID === 'true') {
      this.serviceProvider = true;
      this.admin = false;
    } else if (this.navID === 'false') {
      this.serviceProvider = false;
      this.admin = true;
    }
  }

}
