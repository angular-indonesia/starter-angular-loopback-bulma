import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


let chats = [
  { id: "1", name: "Kylo Ren", photo: "../../../assets/kyloren.jpg", messages: "I will Find him grandfather, i'm promise!" },
  { id: "2", name: "New Order Squad", photo: "../../../assets/neworder.jpg", messages: "We will find Him!" }]

@Injectable()
export class ChatService {

  constructor() { }

  getChats() {
    return Observable.create(observer => {
      observer.next(chats);
    })
  }

  getChat(id) {
    return Observable.create(observer => {
      observer.next(chats.find((chat) => chat.id == id))
    });
  }

}

