import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPageComponent } from './crud-page.component';

describe('CrudPageComponent', () => {
  let component: CrudPageComponent;
  let fixture: ComponentFixture<CrudPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
