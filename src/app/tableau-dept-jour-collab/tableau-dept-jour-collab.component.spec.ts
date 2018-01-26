import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDeptJourCollabComponent } from './tableau-dept-jour-collab.component';

describe('TableauDeptJourCollabComponent', () => {
  let component: TableauDeptJourCollabComponent;
  let fixture: ComponentFixture<TableauDeptJourCollabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauDeptJourCollabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauDeptJourCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
