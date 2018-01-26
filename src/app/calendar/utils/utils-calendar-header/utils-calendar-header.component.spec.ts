import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsCalendarHeaderComponent } from './utils-calendar-header.component';

describe('UtilsCalendarHeaderComponent', () => {
  let component: UtilsCalendarHeaderComponent;
  let fixture: ComponentFixture<UtilsCalendarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilsCalendarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilsCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
