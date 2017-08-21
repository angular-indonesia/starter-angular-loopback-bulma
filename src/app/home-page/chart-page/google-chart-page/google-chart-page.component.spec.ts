import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartPageComponent } from './google-chart-page.component';

describe('GoogleChartPageComponent', () => {
  let component: GoogleChartPageComponent;
  let fixture: ComponentFixture<GoogleChartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleChartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
