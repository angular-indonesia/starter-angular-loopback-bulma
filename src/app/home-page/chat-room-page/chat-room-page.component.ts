import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChatService } from '../../chat.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-chat-room-page',
  templateUrl: './chat-room-page.component.html',
  styleUrls: ['./chat-room-page.component.scss']
})
export class ChatRoomPageComponent implements OnInit {

  chat: any;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router
  ) {
    // this.router.events.subscribe((event) => {
    //         console.log(event instanceof NavigationEnd);
    //     });
    // console.log(123)
  }


  ngOnInit() {
    // this.chatService.getChat(this.route.snapshot.params['id']).subscribe(
    //   chat => this.chat = chat
    // );
    this.route.params.forEach(params => {
      this.chatService.getChat(this.route.snapshot.params['id']).subscribe(
        chat => this.chat = chat
      );
    });
  }



}
