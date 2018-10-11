import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string;     // Used as display text for item and title for separator type
  state?: string;    // Router state
  icon?: string;    // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean;  // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string;     // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
}
interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}



@Injectable()

export class NavheaderService {
  menuTransparent: boolean;
  constructor() { }
  makeMenuTransparent() {
    this.menuTransparent = true;
  }

  hideMenuTransparent() {
    this.menuTransparent = false;
  }
}
