import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParcialidadComponent } from './modal-parcialidad.component';

describe('ModalParcialidadComponent', () => {
  let component: ModalParcialidadComponent;
  let fixture: ComponentFixture<ModalParcialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParcialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParcialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
