import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FileUploadAdvancedPageComponent } from './file-upload-advance-page.component';

describe('HomePageComponent', () => {
  let component: FileUploadAdvancedPageComponent;
  let fixture: ComponentFixture<FileUploadAdvancedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FileUploadAdvancedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadAdvancedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
