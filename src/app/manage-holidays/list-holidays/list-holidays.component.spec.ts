import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHolidaysComponent } from './list-holidays.component';

describe('ListHolidaysComponent', () => {
  let component: ListHolidaysComponent;
  let fixture: ComponentFixture<ListHolidaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHolidaysComponent]
    });
    fixture = TestBed.createComponent(ListHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
