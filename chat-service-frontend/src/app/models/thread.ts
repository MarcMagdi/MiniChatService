import {User, UsersService} from "./user";
import {Message} from "./message";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiService} from "../services/api";
import {NotificationService} from "../services/notification";

/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

export class Thread {
  public id: number;
  public userOne: string;
  public userTwo: string;
}

export class ThreadFull {
  public id: number;
  public userOne: User;
  public userTwo: User;
  public preview: Message;
  public messages: Message[];
}

@Injectable()
export class ThreadsService {
  constructor(private api : ApiService, private notification : NotificationService) {}

  getUserThreads(threads : ThreadFull[]) : void {
    this.api.get('Threads/users/' + UsersService.getUserID())
      .do(res => {
        for (let thread of res) {
          threads.push(thread);
        }
      })
      .catch(err => this.handleError(err))
      .subscribe(() => {
        return threads;
      });
  }

  /**.
   * Set the given thread with needed value to be initialized.
   * @param thread the thread to set
   * @param threadId thread id to get
   */
  getThread(thread : ThreadFull, threadId : string) : void {
    this.api.get('Threads/' + threadId + "?filter[include]=messages&filter[include]=userOne&filter[include]=userTwo")
      .do(res => {
        thread.userOne.username = res.userOne.username;
        thread.userTwo.username = res.userTwo.username;
        thread.userOne.id = res.userOne.id;
        thread.userTwo.id = res.userTwo.id;
        thread.messages = res.messages;
      })
      // .do(res => { console.log(res) })
      .catch(err => this.handleError(err))
      .subscribe(() => {
        return thread;
      });
  }

  /**.
   * Get a thread between the logged in user and the given user id.
   * @param thread the thread to set the data for
   * @param userId the user id to get the thread with.
   * @returns observable to notify the client of completion.
   */
  getThreadForUser(thread : ThreadFull, userId : string) : Observable<any> {
    return this.api.get('Threads/users/' + UsersService.getUserID() + "/specific_user/" + userId)
      .do(res => {
        thread.id = res.id;
        thread.userOne.username = res.userOne.username;
        thread.userTwo.username = res.userTwo.username;
        thread.userOne.id = res.userOne.id;
        thread.userTwo.id = res.userTwo.id;
        thread.messages = res.messages;
      })
      // .do(res => { console.log(res) })
      .catch(err => Observable.throw(err));
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
