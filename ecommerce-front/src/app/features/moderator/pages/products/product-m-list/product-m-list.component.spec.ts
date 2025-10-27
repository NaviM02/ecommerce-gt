import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMListComponent } from './product-m-list.component';

describe('ProductMListComponent', () => {
  let component: ProductMListComponent;
  let fixture: ComponentFixture<ProductMListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
