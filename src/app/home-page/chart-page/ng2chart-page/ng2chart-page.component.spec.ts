import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2chartPageComponent } from './ng2chart-page.component';

describe('Ng2chartPageComponent', () => {
  let component: Ng2chartPageComponent;
  let fixture: ComponentFixture<Ng2chartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2chartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2chartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
