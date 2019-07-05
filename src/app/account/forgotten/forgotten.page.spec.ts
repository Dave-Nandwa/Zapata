import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPage } from './forgotten.page';

describe('ForgottenPage', () => {
  let component: ForgottenPage;
  let fixture: ComponentFixture<ForgottenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgottenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgottenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
