import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreMoisAnneeDeptComponent } from './filtre-mois-annee-dept.component';

describe('FiltreMoisAnneeDeptComponent', () => {
  let component: FiltreMoisAnneeDeptComponent;
  let fixture: ComponentFixture<FiltreMoisAnneeDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreMoisAnneeDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreMoisAnneeDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
