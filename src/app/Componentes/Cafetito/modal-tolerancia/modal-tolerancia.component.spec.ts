import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToleranciaComponent } from './modal-tolerancia.component';

describe('ModalToleranciaComponent', () => {
  let component: ModalToleranciaComponent;
  let fixture: ComponentFixture<ModalToleranciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalToleranciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToleranciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
