import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from './model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  get Notifications$(): Observable<Notification[]> {
    return this.getNotificationsObservable();
  }

  getNotificationsObservable(): Observable<Notification[]> {
    return undefined as unknown as Observable<Notification[]>
  }

}
