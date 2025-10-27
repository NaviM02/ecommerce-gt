import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientsProductsComponent } from './top-clients-products.component';

describe('TopClientsProductsComponent', () => {
  let component: TopClientsProductsComponent;
  let fixture: ComponentFixture<TopClientsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientsProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
