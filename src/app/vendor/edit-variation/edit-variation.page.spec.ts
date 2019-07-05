import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariationPage } from './edit-variation.page';

describe('EditVariationPage', () => {
  let component: EditVariationPage;
  let fixture: ComponentFixture<EditVariationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVariationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVariationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
