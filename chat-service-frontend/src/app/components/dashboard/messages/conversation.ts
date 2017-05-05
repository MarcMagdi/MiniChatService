/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import {OnInit, OnDestroy, Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../../services';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ThreadFull, ThreadsService} from "../../../models/thread";
import {UsersService, User} from "../../../models/user";
import {MessagesService} from "../../../models/message";
import {SubscribeService} from "../../../services/subscribe";

declare var $: any;

@Component({
  selector: 'conversation-area',
  templateUrl: 'conversation.html'
})

export class ConversationComponent {
  message : string;
  thread: ThreadFull = new ThreadFull();
  userId : string;
  connection;
  constructor(private notification: NotificationService, private activatedRoute: ActivatedRoute,
              private threadService : ThreadsService, private messageService : MessagesService,
              private subscriber: SubscribeService) {

  }

  ngOnInit() {


    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.thread.userOne = new User();
      this.thread.userTwo = new User();
      this.userId = UsersService.getUserID();

      let user_id = params['user_id'];
      if (user_id) {

        this.threadService.getThreadForUser(this.thread, user_id)
          .do(res => {
            this.subscriber.registerOnThread(res.id);
          }).subscribe();

        this.connection = this.subscriber.getNewMessage().subscribe(message => {
          this.thread.messages.push(message.instance);
        });
      } else {
        this.activatedRoute.params.subscribe((params: Params) => {
          let threadId = params.id;
          this.thread.id = threadId;
          this.threadService.getThread(this.thread, threadId);
          this.subscriber.registerOnThread(threadId);

          this.connection = this.subscriber.getNewMessage().subscribe(message => {
            this.thread.messages.push(message.instance);
          });
        });
      }
    });
  }

  sendMessage() {
    if (this.message.trim() != "") {
      this.messageService.sendNewMessage(this.thread, this.message);
      this.message = "";
    }
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    let msgBody = "Error getting conversation data";
    this.notification.sendNotification(msgBody, "error", "danger", "top", "right");
    return Observable.throw(errMsg);
  }
}
