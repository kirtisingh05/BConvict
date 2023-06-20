import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFormsComponent } from './show-forms.component';

describe('ShowFormsComponent', () => {
  let component: ShowFormsComponent;
  let fixture: ComponentFixture<ShowFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
