import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDesAbsencesComponent } from './validation-des-absences.component';

describe('ValidationDesAbsencesComponent', () => {
  let component: ValidationDesAbsencesComponent;
  let fixture: ComponentFixture<ValidationDesAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDesAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDesAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
