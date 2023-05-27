import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQrComponent } from './modal-qr.component';

describe('ModalQrComponent', () => {
  let component: ModalQrComponent;
  let fixture: ComponentFixture<ModalQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
