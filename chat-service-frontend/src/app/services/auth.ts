/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {
  TOKEN_KEY: string = 'retain_token';
  USER_ID_KEY: string = 'user_id';
  USER_TOKEN: string = '';

  // check for login token in local storage
  constructor(private api: ApiService, private router: Router) {
    const token = window.localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.USER_TOKEN = token;
    }
  }

  canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  isAuthorized(): boolean {
    return Boolean(this.USER_TOKEN);
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['', 'login']);
    }
  }

  authenticate(path, creds) {
    return this.api.post(`${path}`, creds)
      .do(res => this.setLocalData(res))
      .map(res => res.data);
  }

  setLocalData(data: any) {
    window.localStorage.setItem(this.TOKEN_KEY, data.id);
    window.localStorage.setItem(this.USER_ID_KEY, data.userId);
    this.api.setHeaders({Authorization: `${data.id}`});
    this.USER_TOKEN = data.id;
  }

  signout() {
    window.localStorage.removeItem(this.TOKEN_KEY);
    this.USER_TOKEN = '';
    this.router.navigate(['', 'auth']);
  }
}
