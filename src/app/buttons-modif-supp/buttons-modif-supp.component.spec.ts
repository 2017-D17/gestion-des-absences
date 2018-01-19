import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsModifSuppComponent } from './buttons-modif-supp.component';

describe('ButtonsModifSuppComponent', () => {
  let component: ButtonsModifSuppComponent;
  let fixture: ComponentFixture<ButtonsModifSuppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsModifSuppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsModifSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
