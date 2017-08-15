import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  chats:any[];
  constructor(
    private chatService: ChatService,
    private router: Router) {

    
  }

  ngOnInit() {
    this.chats = this.chatService.getChats();
  }

  onSelect(id){
    console.log(id);
    
    this.router.navigate(['/home/chat/chatroom/', id]);
  }

}
