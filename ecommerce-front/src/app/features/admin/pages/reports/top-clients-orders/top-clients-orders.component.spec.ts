import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientsOrdersComponent } from './top-clients-orders.component';

describe('TopClientsOrdersComponent', () => {
  let component: TopClientsOrdersComponent;
  let fixture: ComponentFixture<TopClientsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientsOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
