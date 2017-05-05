/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../models/user';
import * as io from 'socket.io-client';

export class SubscribeService {
  private url = 'http://localhost:3000';
  private socket;
  private SESSION_ID = "";

  constructor() {
    this.socket = io(this.url, { query: "id=" + UsersService.getUserID() });
    this.socket.on('sessionId', (data) => {
      this.SESSION_ID = data.id;
    });
  }

  /**.
   * Register on the given thread to get new messages.
   * @param threadId the thread id to register on.
   */
  registerOnThread(threadId : string) : void {
      this.socket.emit('register-thread', {threadId: threadId});
  }

  /**.
   * @returns an observable to notify if any user become online.
   */
  getNewUserOnline(): Observable<any> {
    let observable = new Observable(observer => {

      this.socket.on('user', (data) => {
        // console.log("New online user:");
        // console.log(data);
        if (data.instance.id != UsersService.getUserID())
          observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  /**.
   * @returns an observable to notify of new message on the subscrived thread.
   */
  getNewMessage(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
