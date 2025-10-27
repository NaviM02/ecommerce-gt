import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientsSalesComponent } from './top-clients-sales.component';

describe('TopClientsSalesComponent', () => {
  let component: TopClientsSalesComponent;
  let fixture: ComponentFixture<TopClientsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientsSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
