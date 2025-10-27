import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMDetailComponent } from './product-m-detail.component';

describe('ProductMDetailComponent', () => {
  let component: ProductMDetailComponent;
  let fixture: ComponentFixture<ProductMDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
