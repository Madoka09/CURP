import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPage } from './cargo.page';

describe('CargoPage', () => {
  let component: CargoPage;
  let fixture: ComponentFixture<CargoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
