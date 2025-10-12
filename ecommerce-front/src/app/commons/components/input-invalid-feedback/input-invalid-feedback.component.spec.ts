import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInvalidFeedbackComponent } from './input-invalid-feedback.component';

describe('InputInvalidFeedbackComponent', () => {
  let component: InputInvalidFeedbackComponent;
  let fixture: ComponentFixture<InputInvalidFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputInvalidFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInvalidFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
