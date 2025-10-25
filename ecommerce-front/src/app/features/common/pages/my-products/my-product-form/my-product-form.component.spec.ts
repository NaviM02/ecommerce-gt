import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductFormComponent } from './my-product-form.component';

describe('MyProductFormComponent', () => {
  let component: MyProductFormComponent;
  let fixture: ComponentFixture<MyProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
