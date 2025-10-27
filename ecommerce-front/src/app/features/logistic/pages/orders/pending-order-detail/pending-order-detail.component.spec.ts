import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderDetailComponent } from './pending-order-detail.component';

describe('PendingOrderDetailComponent', () => {
  let component: PendingOrderDetailComponent;
  let fixture: ComponentFixture<PendingOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingOrderDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
