import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientsProfitComponent } from './top-clients-profit.component';

describe('TopClientsProfitComponent', () => {
  let component: TopClientsProfitComponent;
  let fixture: ComponentFixture<TopClientsProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientsProfitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientsProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
