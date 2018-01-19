import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeAbsencesComponent } from './gestion-de-absences.component';

describe('GestionDeAbsencesComponent', () => {
  let component: GestionDeAbsencesComponent;
  let fixture: ComponentFixture<GestionDeAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDeAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
