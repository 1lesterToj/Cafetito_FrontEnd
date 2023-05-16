import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateChildComponent } from './form-create-child.component';

describe('FormCreateChildComponent', () => {
  let component: FormCreateChildComponent;
  let fixture: ComponentFixture<FormCreateChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
