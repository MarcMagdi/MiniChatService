/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Component } from '@angular/core';
import { AuthService, NotificationService, ApiService } from '../../services';
import { Router } from '@angular/router';
import { User } from '../../models';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})

export class LoginComponent {
  user = new User();
  userRegister = new User();
  constructor(private auth: AuthService, private router: Router,
              private notification: NotificationService, private api: ApiService) {}

  authenticate() {
    this.auth.authenticate('UserModels/login', this.user)
      .catch(err => this.handleError(err, "Invalid <b>Username</b> or <b>Password</b>"))
      .subscribe(() => this.router.navigate(['/dashboard']))
  }

  register() {
    this.api.post('UserModels', this.userRegister)
      .catch(err => this.handleError(err, "Error Registering new user"))
      .do(() => this.user = this.userRegister)
      .subscribe(() => this.authenticate())
  }

  private handleError (error: any, msg: string) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    let msgBody = msg;
    this.notification.sendNotification(msgBody, "contacts", "danger", "top", "right");
    return Observable.throw(errMsg);
  }
}
