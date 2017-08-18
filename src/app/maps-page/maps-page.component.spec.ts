import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsPageComponent } from './maps-page.component';

describe('MapsPageComponent', () => {
  let component: MapsPageComponent;
  let fixture: ComponentFixture<MapsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
