import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningAbsencesComponent } from './planning-absences.component';

describe('PlanningAbsencesComponent', () => {
  let component: PlanningAbsencesComponent;
  let fixture: ComponentFixture<PlanningAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
