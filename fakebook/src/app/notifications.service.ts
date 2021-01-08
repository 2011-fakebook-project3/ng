import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from './model/notification';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications!: Notification[];
  private hubConnection: HubConnection

  constructor(private http: HttpClient) {
    this.hubConnection = new HubConnectionBuilder()
                             .withUrl(`${environment.baseUrl}/notifications`)
                             .build();
    this.hubConnection.start();

    this.hubConnection.on('SendOne', (data) => {
      this.notifications = data;
    });
  }

  get notifications$(): Notification[] {
    return this.notifications;
  }

  setUnread(id: number): void {
    this.http.post(`${environment.baseUrl}/notifications`, id);
  }
}
