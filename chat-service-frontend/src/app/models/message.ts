/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

import { Injectable } from '@angular/core';
import { ApiService } from '../services';
import { Observable } from 'rxjs/Observable';
import {NotificationService} from "../services/notification";
import {UsersService} from "./user";
import {ThreadFull} from "./thread";

export class Message {
  public id: number;
  public Value: string;
  public from: string;
  public to: string;
  public date: Date;
  public threadId: string;
}

@Injectable()
export class MessagesService {
  constructor(private api : ApiService, private notification : NotificationService) {}

  /**.
   * Send a new message
   * @param thread the thread to send into
   * @param messageValue the message value
   */
  sendNewMessage(thread : ThreadFull, messageValue : string) {
    let message = new Message();
    message.Value = messageValue;
    message.date = new Date();
    message.from = UsersService.getUserID();
    if (thread.userOne.id + "" == message.from) {
      message.to = thread.userTwo.id + "";
    } else {
      message.to = thread.userOne.id + "";
    }

    this.api.post('threads/' + thread.id + "/messages", message)
      .catch(err => this.handleError(err))
      .subscribe();
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    let msgBody = "Error sending new message";
    this.notification.sendNotification(msgBody, "error", "danger", "top", "right");
    return Observable.throw(errMsg);
  }
}
