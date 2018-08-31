import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgencyComponent } from './view-agency.component';

describe('ViewAgencyComponent', () => {
  let component: ViewAgencyComponent;
  let fixture: ComponentFixture<ViewAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
