import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveUserAddComponent } from './leave-user-add.component';

describe('LeaveUserAddComponent', () => {
  let component: LeaveUserAddComponent;
  let fixture: ComponentFixture<LeaveUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveUserAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
