import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanctionModalComponent } from './add-sanction-modal.component';

describe('AddSanctionModalComponent', () => {
  let component: AddSanctionModalComponent;
  let fixture: ComponentFixture<AddSanctionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSanctionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSanctionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
