import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChatService } from '../../chat.service';
import { RoomchatApi } from '../../../shared/services/custom/Roomchat';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.scss']
})
export class ChatRoomPageComponent implements OnInit {

  chats: any;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private roomChatApi: RoomchatApi
  ) {
    this.getChatDetail();
  }


  ngOnInit() {
  }

  getChatDetail() {
    this.route.params.forEach(params => {
      this.roomChatApi.find({
        where: {
          id: this.route.snapshot.params['id']
        }
      }).subscribe((result) => {
        this.chats = result;
      })
    });

  }



}
