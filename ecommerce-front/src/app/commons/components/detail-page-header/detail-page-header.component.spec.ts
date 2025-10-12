import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageHeaderComponent } from './detail-page-header.component';

describe('DetailPageHeaderComponent', () => {
  let component: DetailPageHeaderComponent;
  let fixture: ComponentFixture<DetailPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
