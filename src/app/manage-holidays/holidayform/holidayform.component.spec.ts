import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayformComponent } from './holidayform.component';

describe('HolidayformComponent', () => {
  let component: HolidayformComponent;
  let fixture: ComponentFixture<HolidayformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayformComponent]
    });
    fixture = TestBed.createComponent(HolidayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
