import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvidenceComponent } from './add-evidence.component';

describe('AddEvidenceComponent', () => {
  let component: AddEvidenceComponent;
  let fixture: ComponentFixture<AddEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEvidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
