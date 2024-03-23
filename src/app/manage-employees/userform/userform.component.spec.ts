import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserformComponent } from './userform.component';

describe('UserformComponent', () => {
  let component: UserformComponent;
  let fixture: ComponentFixture<UserformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserformComponent]
    });
    fixture = TestBed.createComponent(UserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
