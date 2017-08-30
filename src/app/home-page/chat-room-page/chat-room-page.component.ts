import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChatService } from '../../chat.service';
import { RoomchatApi } from '../../../shared/services/custom/Roomchat';
import { Http, Response } from '@angular/http';
import { ChatdetailApi } from '../../../shared/services/custom/Chatdetail';
import { RealTime } from '../../../shared/services/core/real.time';
import { FireLoopRef } from '../../../shared/models/FireLoopRef';
import { Chatdetail } from '../../../shared/models/Chatdetail';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.scss']
})
export class ChatRoomPageComponent implements OnInit {

  public chats: any;
  public id: number;
  public chatDetail: Chatdetail = new Chatdetail();
  public todoRef: FireLoopRef<Chatdetail>;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private roomChatApi: RoomchatApi,
    private chatDetailApi: ChatdetailApi,
    private rt: RealTime
  ) {

    this.rt.onReady().subscribe((status: string) => {
      this.todoRef = this.rt.FireLoop.ref<Chatdetail>(Chatdetail);
      this.todoRef.on('change').subscribe((chats: any) => {
        console.log(chats, 'isi chats');
        this.chats = chats;
      });
      this.getChatDetail();
    });
  }


  ngOnInit() {
  }

  getChatDetail() {
    this.route.params.forEach(params => {
      // this.roomChatApi.find({
      //   where: {
      //     id: this.route.snapshot.params['id']
      //   }
      // }).subscribe((result) => {
      //   this.chats = result;
      // });

      this.chatDetailApi.find({
        where: {
          id: this.route.snapshot.params['id']
        }
      }).subscribe((result) => {
        this.chats = result;
      });
    });

  }

}
