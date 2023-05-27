import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaQrTransportistaComponent } from './consulta-qr-transportista.component';

describe('ConsultaQrTransportistaComponent', () => {
  let component: ConsultaQrTransportistaComponent;
  let fixture: ComponentFixture<ConsultaQrTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaQrTransportistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaQrTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
