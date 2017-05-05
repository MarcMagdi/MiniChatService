/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../../services';
import {UsersService} from "../../../models/user";
import {ThreadsService, ThreadFull} from "../../../models/thread";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'conversations',
  templateUrl: 'conversations.html'
})

export class ConversationsComponent {
  threads : ThreadFull[] = [];
  userId : string;

  constructor(private notification: NotificationService, private threadService : ThreadsService,
              private router : Router) {
    this.userId = UsersService.getUserID();
    this.threadService.getUserThreads(this.threads);
  }

  clickRow(row : any) {
    this.router.navigate(['/conversations/' + row.id]);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    let msgBody = "Error getting data";
    this.notification.sendNotification(msgBody, "error", "danger", "top", "right");
    return Observable.throw(errMsg);
  }
}
