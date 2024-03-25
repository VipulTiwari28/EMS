import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInfoComponent } from './manage-info.component';

describe('ManageInfoComponent', () => {
  let component: ManageInfoComponent;
  let fixture: ComponentFixture<ManageInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInfoComponent]
    });
    fixture = TestBed.createComponent(ManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
