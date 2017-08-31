import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';
import { RoomchatApi } from '../../../shared/services/custom/Roomchat';
import { UserCredentialApi } from '../../../shared/services/custom/UserCredential';
import { RealTime } from '../../../shared/services/core/real.time';
import { FireLoopRef } from '../../../shared/models/FireLoopRef';
import { Roomchat } from '../../../shared/models/Roomchat';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  public chats: any[];
  public roomName: any;
  public userCredential: any;
  public roomChat: Roomchat = new Roomchat();
  public todoRef: FireLoopRef<Roomchat>;
  public rooms: any;
  public displayModalAdd: any;
  public visibleModal: any;
  public today = new Date();

  constructor(
    private chatService: ChatService,
    private router: Router,
    private roomChatApi: RoomchatApi,
    private userCredentialApi: UserCredentialApi,
    private rt: RealTime
  ) {
      this.displayModalAdd = 'modal';
      this.visibleModal = false;

      this.rt.onReady().subscribe((status: string) => {
        this.todoRef = this.rt.FireLoop.ref<Roomchat>(Roomchat);
        this.todoRef.on('change').subscribe((rooms: any) => {
          console.log(rooms, 'isi rooms');
          this.rooms = rooms;
        });
      });
  }

  ngOnInit() {
    this.chats = this.chatService.getChats();
  }

  onSelect(id) {
    this.router.navigate(['/home/chat/chatroom/', id]);
  }

  getRoom() {
    this.roomChatApi.find().subscribe((result) => {
      this.rooms = result;
    });
  }

  getUserCredential() {
    this.userCredentialApi.findById(2).subscribe((result) => {
      this.userCredential = result;
    });
  }

  eventHandler(data) {
    console.log(data, 'dataSearch');
    this.roomChatApi.find({
      where: {
        roomname: {
          like: '%' + data.target.value + '%'
        }
      }
    }).subscribe((result) => {
      this.rooms = result;
      console.log(this.rooms, 'rooms');
    });
  }

  public modalAdd() {
    this.visibleModal = !this.visibleModal;
    this.displayModalAdd = this.visibleModal ? 'modal is-active' : 'modal';
  }

  public closeAdd() {
    this.visibleModal = !this.visibleModal;
    this.displayModalAdd = this.visibleModal ? 'modal is-active' : 'modal';
  }

  public createData() {

    this.roomChatApi.create({
      roomname: this.roomName,
      createdat: this.today
    }).subscribe((results) => {
      console.log('Sukses');
      this.closeAdd();
    }, (error) => {
      console.log(error);
    });
  }

}
