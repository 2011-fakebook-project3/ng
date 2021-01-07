import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from './model/notification';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications!: Notification[];

  constructor(private hubConnection: signalR.HubConnection) {
    this.hubConnection = new signalR.HubConnectionBuilder()
                             .withUrl(`${environment.baseUrl}/notifications`)
                             .build();
    this.hubConnection.start();

    this.hubConnection.on('transfernotificationdata', (data) => {
      this.notifications = data;
    });
  }

  get notifications$(): Notification[] {
    return this.notifications;
  }
}
