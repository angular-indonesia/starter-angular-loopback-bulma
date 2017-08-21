import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';
import { RoomchatApi } from '../../../shared/services/custom/Roomchat';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  chats: any[];
  roomChat: any;
  constructor(
    private chatService: ChatService,
    private router: Router,
    private roomChatApi: RoomchatApi) {


      this.getRoom();
  }

  ngOnInit() {
    this.chats = this.chatService.getChats();
  }

  onSelect(id) {
    this.router.navigate(['/home/chat/chatroom/', id]);
  }

  getRoom() {
    this.roomChatApi.find().subscribe((result) => {
      this.roomChat = result
    })
  }

}
