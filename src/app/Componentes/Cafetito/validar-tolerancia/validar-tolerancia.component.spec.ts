import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarToleranciaComponent } from './validar-tolerancia.component';

describe('ValidarToleranciaComponent', () => {
  let component: ValidarToleranciaComponent;
  let fixture: ComponentFixture<ValidarToleranciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarToleranciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarToleranciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
