import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesAbsencesComponent } from './gestion-des-absences.component';

describe('GestionDesAbsencesComponent', () => {
  let component: GestionDesAbsencesComponent;
  let fixture: ComponentFixture<GestionDesAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDesAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
