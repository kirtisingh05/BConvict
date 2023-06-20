import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirComponent } from './add-fir.component';

describe('AddFirComponent', () => {
  let component: AddFirComponent;
  let fixture: ComponentFixture<AddFirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
