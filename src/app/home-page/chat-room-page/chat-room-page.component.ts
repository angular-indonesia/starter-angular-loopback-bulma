import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChatService } from '../../chat.service';
import { RoomchatApi } from '../../../shared/services/custom/Roomchat';
import { Http, Response } from '@angular/http';
import { ChatdetailApi } from '../../../shared/services/custom/Chatdetail';
import { RealTime } from '../../../shared/services/core/real.time';
import { FireLoopRef } from '../../../shared/models/FireLoopRef';
import { Chatdetail } from '../../../shared/models/Chatdetail';
import { Roomchat } from '../../../shared/models/Roomchat';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.scss']
})
export class ChatRoomPageComponent implements OnInit {

  public chats: any;
  public message: any;
  public id: number;
  public chatDetail: Chatdetail;
  public todoRef: FireLoopRef<Chatdetail>;
  public roomChat: Roomchat;
  public today = new Date();

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private roomChatApi: RoomchatApi,
    private chatDetailApi: ChatdetailApi,
    private rt: RealTime
  ) {

    this.route.params.forEach(params => {
      this.rt.onReady().subscribe((status: string) => {
        this.todoRef = this.rt.FireLoop.ref<Chatdetail>(Chatdetail);
        this.todoRef.on('change', {
          where: {
            RoomChatId: this.route.snapshot.params['id']
          }
        }).subscribe((chats: any) => {
          console.log(chats, 'isi chats');
          this.chats = chats;
        });
      });
    });

  }

  ngOnInit() {
  }

  getChatDetail() {
    this.route.params.forEach(params => {
      this.chatDetailApi.find({
        where: {
          RoomChatId: this.route.snapshot.params['id']
        }
      }).subscribe((result) => {
        this.chats = result;
      });
    });

  }

  create(): void {
    this.chatDetail = new Chatdetail({
      sender: 'dimas',
      message: this.message,
      createdat: this.today,
      RoomChatId: this.route.snapshot.params['id']
    });
    this.todoRef.create(this.chatDetail).subscribe((instance: Chatdetail) => console.log(instance, 'instance'));
  }

}
