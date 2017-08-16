import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadAdvancePageComponent } from './file-upload-advence-page.component';

describe('HomePageComponent', () => {
  let component: FileUploadAdvancePageComponent;
  let fixture: ComponentFixture<FileUploadAdvancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadAdvancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadAdvancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
