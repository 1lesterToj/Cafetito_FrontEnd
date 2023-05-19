import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionSolicitudComponent } from './revision-solicitud.component';

describe('RevisionSolicitudComponent', () => {
  let component: RevisionSolicitudComponent;
  let fixture: ComponentFixture<RevisionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
