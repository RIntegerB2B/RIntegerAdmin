import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveModelComponent } from './approve-model.component';

describe('ApproveModelComponent', () => {
  let component: ApproveModelComponent;
  let fixture: ComponentFixture<ApproveModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
