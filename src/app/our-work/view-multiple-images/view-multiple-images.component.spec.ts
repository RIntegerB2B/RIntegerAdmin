import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMultipleImagesComponent } from './view-multiple-images.component';

describe('ViewMultipleImagesComponent', () => {
  let component: ViewMultipleImagesComponent;
  let fixture: ComponentFixture<ViewMultipleImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMultipleImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMultipleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
