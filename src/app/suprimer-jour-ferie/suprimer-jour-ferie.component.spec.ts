import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuprimerJourFerieComponent } from './suprimer-jour-ferie.component';

describe('SuprimerJourFerieComponent', () => {
  let component: SuprimerJourFerieComponent;
  let fixture: ComponentFixture<SuprimerJourFerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuprimerJourFerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuprimerJourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
