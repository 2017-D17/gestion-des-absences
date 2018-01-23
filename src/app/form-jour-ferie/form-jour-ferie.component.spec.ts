import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJourFerieComponent } from './form-jour-ferie.component';

describe('FormJourFerieComponent', () => {
  let component: FormJourFerieComponent;
  let fixture: ComponentFixture<FormJourFerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormJourFerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJourFerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
