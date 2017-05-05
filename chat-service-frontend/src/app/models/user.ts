/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Injectable } from '@angular/core';
import { ApiService } from '../services';
import { Observable } from 'rxjs/Observable';
import {NotificationService} from "../services/notification";

export class User {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public name: string;
  public online: boolean;
}

@Injectable()
export class UsersService {
  constructor(private api : ApiService, private notification : NotificationService) {}

  static getUserID(): string  {
    return window.localStorage.getItem("user_id");
  }

  getOnlineUsers(users : User[]) : void {
    this.api.get('UserModels?filter[where][id][neq]=' + UsersService.getUserID())
      .do(res => {
        for (let user of res) {
          users.push(user);
        }
      })
      .catch(err => this.handleError(err))
      .subscribe(() => {
        return users;
      });
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    let msgBody = "Error getting data";
    this.notification.sendNotification(msgBody, "error", "danger", "top", "right");
    return Observable.throw(errMsg);
  }
}
