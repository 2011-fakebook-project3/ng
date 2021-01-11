import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../model/notification';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ApiNotification } from '../model/api-notification';
import { OktaAuthService } from '@okta/okta-angular';
import { Notification as Dontdothis, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Subject<Notification[]> = new Subject<Notification[]>();
  private hubConnection: HubConnection;
  public notificationsObs = this.notifications.asObservable();

  constructor(private http: HttpClient, private authService: OktaAuthService) {

    this.hubConnection = new HubConnectionBuilder()
                             .withUrl(`${environment.baseUrl}/notifications`)
                             .build();
    this.hubConnection.start();

    this.hubConnection.on('SendAll', (data, data2) => {
      this.notifications.next(this.mapNotifications([data2] as ApiNotification[]));
    });
  }

  mapNotifications(dbNotif: ApiNotification[]): Notification[] {
    const notifs: Notification[] = [];

    dbNotif.forEach(element => {
      notifs.push({
        userId: element.triggerUserId,
        type: element.type.key,
        date: element.date,
        postId: element.type.value
      });
    });
    return notifs;
  }

  mapNotification(dbNotif: ApiNotification): Notification {

    const notif: Notification = {
      userId: dbNotif.triggerUserId,
      postId: dbNotif.type.value,
      type: dbNotif.type.key,
      date: dbNotif.date
    };

    return notif;
  }

  setUnread(id: number): void {
    // update to use signalR
    this.http.post(`${environment.baseUrl}/notifications`, id);
  }
}
