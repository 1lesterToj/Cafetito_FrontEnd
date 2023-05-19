import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionPesoComponent } from './revision-peso.component';

describe('RevisionPesoComponent', () => {
  let component: RevisionPesoComponent;
  let fixture: ComponentFixture<RevisionPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
