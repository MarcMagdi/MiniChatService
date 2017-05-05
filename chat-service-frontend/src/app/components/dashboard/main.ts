/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Component, OnInit,OnDestroy } from '@angular/core';
import { NotificationService, SubscribeService } from '../../services';
import { User } from '../../models';

declare var $: any;

@Component({
  selector: 'main',
  templateUrl: './partials/main.html'
})

export class MainComponent implements OnInit, OnDestroy {
  user = new User();
  connection;

  constructor(private notification: NotificationService,
              private subscriber: SubscribeService) {}

  ngOnInit() {
    this.connection = this.subscriber.getNewUserOnline().subscribe(user => {
      if (user.type == "user-online") {
        let msgBody = "User: <b>" + user.instance.username + "</b> is now online.";
        this.notification.sendNotification(msgBody, "contacts", "primary", "top", "right");
      } else if (user.type == "user-offline") {
        let msgBody = "User: <b>" + user.instance.username + "</b> is now offline.";
        this.notification.sendNotification(msgBody, "contacts", "danger", "top", "right");
      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
