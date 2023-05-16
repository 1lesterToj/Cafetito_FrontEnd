import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPComponent } from './nav-p.component';

describe('NavPComponent', () => {
  let component: NavPComponent;
  let fixture: ComponentFixture<NavPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
