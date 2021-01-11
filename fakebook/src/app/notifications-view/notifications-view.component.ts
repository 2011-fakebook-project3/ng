import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../service/notifications.service';
import { Notification } from '../model/notification';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css'],
})
export class NotificationsViewComponent implements OnInit {

  notifications: Notification[] = [
    { userId: '1', postId: 1, type: 'like', date: new Date() },
    { userId: '2', postId: 2, type: 'comment', date: new Date() },
    { userId: '3', type: 'follow', date: new Date() },
    { userId: '4', postId: 3, type: 'post', date: new Date() },
  ];
  notificationsView = false;
  unreadNotifications = true;

  constructor(
    private notifService: NotificationsService,
    ) {
    }

  ngOnInit(): void {
    this.notifService.notificationsObs.subscribe((notifs) => {
      notifs.forEach(element => {
        this.notifications.push(element);
      });
      this.unreadNotifications = true;
      console.log(notifs);
      console.log(this.notifications);
    });
  }

  toggleNotifications(): void {
    this.notificationsView = !this.notificationsView;
    if (this.notificationsView === true){
      this.unreadNotifications = false;
    }
  }
}
