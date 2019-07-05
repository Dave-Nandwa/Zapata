import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInfoPage } from './vendor-info.page';

describe('VendorInfoPage', () => {
  let component: VendorInfoPage;
  let fixture: ComponentFixture<VendorInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
