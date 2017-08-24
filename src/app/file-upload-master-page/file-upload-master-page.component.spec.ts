import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadMasterPageComponent } from './file-upload-master-page.component';

describe('FileUploadMasterPageComponent', () => {
  let component: FileUploadMasterPageComponent;
  let fixture: ComponentFixture<FileUploadMasterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadMasterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
