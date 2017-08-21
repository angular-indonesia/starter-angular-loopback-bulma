import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsPageComponent } from './highcharts-page.component';

describe('HighchartsPageComponent', () => {
  let component: HighchartsPageComponent;
  let fixture: ComponentFixture<HighchartsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
