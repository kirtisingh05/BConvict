import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginheaderComponent } from './loginheader.component';

describe('LoginheaderComponent', () => {
  let component: LoginheaderComponent;
  let fixture: ComponentFixture<LoginheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
