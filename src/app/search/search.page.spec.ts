import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeachPage } from './search.page';

describe('SeachPage', () => {
  let component: SeachPage;
  let fixture: ComponentFixture<SeachPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeachPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
