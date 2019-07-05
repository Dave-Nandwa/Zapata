import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNoteListPage } from './order-note-list.page';

describe('OrderNoteListPage', () => {
  let component: OrderNoteListPage;
  let fixture: ComponentFixture<OrderNoteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNoteListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNoteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
