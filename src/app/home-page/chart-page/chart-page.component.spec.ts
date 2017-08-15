import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPageComponent } from './chart-page.component';

describe('ChartPageComponent', () => {
  let component: ChartPageComponent;
  let fixture: ComponentFixture<ChartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
