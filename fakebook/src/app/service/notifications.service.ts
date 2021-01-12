import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../model/notification';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@aspnet/signalr';
import { ApiNotification } from '../model/api-notification';
import { OktaAuthService } from '@okta/okta-angular';
import { Notification as Dontdothis, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Subject<Notification[]> = new Subject<Notification[]>();
  private hubConnection: HubConnection;
  public notificationsObs = this.notifications.asObservable();
  private token = this.authService.oktaAuth.getAccessToken();

  constructor(private authService: AuthService) {

    // initialize options so hub connection can use authorization
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        if (this.token === undefined) {
          return '';
        }
        else {
          return this.token;
        }
      }
    };

    // Start hub connection to SignalR
    this.hubConnection = new HubConnectionBuilder()
                             .withUrl(`${environment.baseUrl}/notifications`, options)
                             .build();
    this.hubConnection.start();

    // push each a notification object to two different arrays so its easy to
    // update when sending back to the backend
    this.hubConnection.on('SendAll', (data, data2) => {
      this.notifications.next(this.mapNotifications([data2] as ApiNotification[]));
    });
  }

  // mapping function that maps the received notification to the one that the component uses
  mapNotifications(dbNotif: ApiNotification[]): Notification[] {
    const notifs: Notification[] = [];

    dbNotif.forEach(element => {
      notifs.push({
        id: element.id,
        userId: element.triggerUserId,
        type: element.type.key,
        date: element.date,
        postId: element.type.value
      });
    });
    return notifs;
  }

  // once the notifications view has expanded, will set all notifications to read on the database
  setRead(ids: string[]): void {
    this.hubConnection.invoke('SetNotificationsToRead', ids);
  }
}
