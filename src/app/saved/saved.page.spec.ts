import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPage } from './saved.page';

describe('SavedPage', () => {
  let component: SavedPage;
  let fixture: ComponentFixture<SavedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
