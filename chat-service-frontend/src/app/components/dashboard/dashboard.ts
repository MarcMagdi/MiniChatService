/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../services';
import {UsersService, User} from "../../models/user";
import {Router, NavigationExtras} from "@angular/router";

declare var $: any;

@Component({
  selector: 'dashboard',
  templateUrl: 'partials/dashboard.html'
})

export class DashboardComponent {
  users : User[] = [];
  user = new User();

  constructor(private router : Router,private notification: NotificationService,
              private userService : UsersService) {
    this.userService.getOnlineUsers(this.users);
  }

  rowClick(row : User) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'user_id': row.id }
    };

    this.router.navigate(['/conversations/new/'], navigationExtras);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    let msgBody = "Error getting users data";
    this.notification.sendNotification(msgBody, "error", "danger", "top", "right");
    return Observable.throw(errMsg);
  }
}
