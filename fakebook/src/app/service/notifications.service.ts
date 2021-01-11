import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../model/notification';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ApiNotification } from '../model/api-notification';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[] = [];
  private hubConnection: HubConnection;

  constructor(private http: HttpClient, private authService: OktaAuthService) {

    this.hubConnection = new HubConnectionBuilder()
                             .withUrl(`${environment.baseUrl}/notifications`)
                             .build();
    this.hubConnection.start();

    this.hubConnection.on('SendCaller', (data) => {
      console.log(data);
      console.log("memes")
    });
  }

  mapNotifications(dbNotif: ApiNotification[]): Notification[] {
    const notifs: Notification[] = [];

    dbNotif.forEach(element => {
      notifs.push({
        userId: element.TriggerUserId,
        type: element.Type.Key,
        date: element.Date,
        postId: element.Type.Value
      });
    });

    return notifs;
  }

  get notifications$(): Notification[] {
    return this.notifications;
  }

  setUnread(id: number): void {
    this.http.post(`${environment.baseUrl}/notifications`, id);
  }
}
