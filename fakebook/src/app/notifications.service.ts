import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from './model/notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  get notifications$(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${environment.baseUrl}/notifications`);
  }
}
