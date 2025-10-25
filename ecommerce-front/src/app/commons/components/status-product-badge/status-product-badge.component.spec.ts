import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusProductBadgeComponent } from './status-product-badge.component';

describe('StatusProductBadgeComponent', () => {
  let component: StatusProductBadgeComponent;
  let fixture: ComponentFixture<StatusProductBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusProductBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusProductBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
