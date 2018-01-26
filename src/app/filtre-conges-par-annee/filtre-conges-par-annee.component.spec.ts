import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreCongesParAnneeComponent } from './filtre-conges-par-annee.component';

describe('FiltreCongesParAnneeComponent', () => {
  let component: FiltreCongesParAnneeComponent;
  let fixture: ComponentFixture<FiltreCongesParAnneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreCongesParAnneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreCongesParAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
