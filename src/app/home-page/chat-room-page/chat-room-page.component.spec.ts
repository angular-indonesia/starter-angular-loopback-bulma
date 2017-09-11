import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { ChatRoomPageComponent } from './chat-room-page.component';

describe('ChatRoomPageComponent', () => {
  let component: ChatRoomPageComponent;
  let fixture: ComponentFixture<ChatRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [Http, HttpModule],
      declarations: [ ChatRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
