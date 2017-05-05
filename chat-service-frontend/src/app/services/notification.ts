/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

declare var $: any;

@Injectable()
export class NotificationService {
  sendNotification(messageBody: string, iconMaterial: string,
                      type: string, from: string, align: string) {
    $.notify({
      icon: iconMaterial,
      message: messageBody

    },{
      type: type,
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
