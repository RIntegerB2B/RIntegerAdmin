import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NavheaderService } from './nav-header.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Permission } from './../user-management/permission/permission/permission.model';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, OnDestroy, AfterViewInit  {
  navID;
  admin: boolean;
  serviceProvider: boolean;
  subMenus: boolean;
  panelOpenState: boolean;
  menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  menuItemsSub: Subscription;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  mobileNo;
  roles: Permission;
  enable: boolean;
  filterValue;
  toggleBar = 'colapseMenuBar';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  constructor(private fb: FormBuilder, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private localStorageService: LocalStorageService, private router: Router,
    private activatedRoute: ActivatedRoute , public navheaderService: NavheaderService) {
      this.mobileQuery = media.matchMedia(' (min-width: 900px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    this.navID = this.activatedRoute.snapshot.paramMap.get('data');
  }

  ngOnInit() {
    if (this.navID === 'true') {
      this.serviceProvider = true;
      this.admin = false;
    } else if (this.navID === 'false') {
      this.serviceProvider = false;
      this.admin = true;
    }
    this.roles = this.localStorageService.retrieve('roles');
  }
  collapseMenu() {
    this.toggleBar = this.toggleBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  logout() {
    this.localStorageService.clear('isLoggedIn');
    this.router.navigate(['/signIn']);
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#sidebar-top-scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
  }
  ngOnDestroy(): void {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

}
