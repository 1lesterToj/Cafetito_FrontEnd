import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPesoComponent } from './modal-peso.component';

describe('ModalPesoComponent', () => {
  let component: ModalPesoComponent;
  let fixture: ComponentFixture<ModalPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
