import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreDeptMoisAnneeComponent } from './filtre-dept-mois-annee.component';

describe('FiltreDeptMoisAnneeComponent', () => {
  let component: FiltreDeptMoisAnneeComponent;
  let fixture: ComponentFixture<FiltreDeptMoisAnneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreDeptMoisAnneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreDeptMoisAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
