import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreCongesParJourEtParCollabComponent } from './filtre-conges-par-jour-et-par-collab.component';

describe('FiltreCongesParJourEtParCollabComponent', () => {
  let component: FiltreCongesParJourEtParCollabComponent;
  let fixture: ComponentFixture<FiltreCongesParJourEtParCollabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreCongesParJourEtParCollabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreCongesParJourEtParCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
