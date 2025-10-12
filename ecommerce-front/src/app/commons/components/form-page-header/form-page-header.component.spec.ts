import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageHeaderComponent } from './form-page-header.component';

describe('FormPageHeaderComponent', () => {
  let component: FormPageHeaderComponent;
  let fixture: ComponentFixture<FormPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
