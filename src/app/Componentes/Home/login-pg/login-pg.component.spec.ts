import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPGComponent } from './login-pg.component';

describe('LoginPGComponent', () => {
  let component: LoginPGComponent;
  let fixture: ComponentFixture<LoginPGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
