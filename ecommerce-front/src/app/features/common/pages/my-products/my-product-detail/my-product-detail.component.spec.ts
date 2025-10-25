import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductDetailComponent } from './my-product-detail.component';

describe('MyProductDetailComponent', () => {
  let component: MyProductDetailComponent;
  let fixture: ComponentFixture<MyProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProductDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
