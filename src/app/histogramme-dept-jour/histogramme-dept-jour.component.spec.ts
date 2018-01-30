import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogrammeDeptJourComponent } from './histogramme-dept-jour.component';

describe('HistogrammeDeptJourComponent', () => {
  let component: HistogrammeDeptJourComponent;
  let fixture: ComponentFixture<HistogrammeDeptJourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogrammeDeptJourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogrammeDeptJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
