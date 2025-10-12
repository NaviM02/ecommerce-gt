import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredIndicatorComponent } from './required-indicator.component';

describe('RequiredIndicatorComponent', () => {
  let component: RequiredIndicatorComponent;
  let fixture: ComponentFixture<RequiredIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
