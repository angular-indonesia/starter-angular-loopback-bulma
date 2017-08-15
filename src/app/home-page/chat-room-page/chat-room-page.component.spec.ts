import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomPageComponent } from './chat-room-page.component';

describe('ChatRoomPageComponent', () => {
  let component: ChatRoomPageComponent;
  let fixture: ComponentFixture<ChatRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
