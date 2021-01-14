import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../service/notifications.service';
import { Notification } from '../../model/notification';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { runInThisContext } from 'vm';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css'],
})
export class NotificationsViewComponent implements OnInit {

  notifications: Notification[] = [];
  notificationsView = false;
  unreadNotifications = false;

  constructor(
    private notifService: NotificationsService
    ) {
    }

  ngOnInit(): void {
    this.notifService.notificationsObs.subscribe((notifs) => {
      notifs.forEach(element => {
        this.notifications.unshift(element);
      });
      if (this.notificationsView === false) {
        this.unreadNotifications = true;
      }
      console.log(this.notifications);
    });
  }

  toggleNotifications(): void {
    this.notificationsView = !this.notificationsView;
    if (this.notificationsView === true){
      this.unreadNotifications = false;
      this.updateNotifications();
    }
  }

  updateNotifications(): void {
    const ids: string[] = [];

    this.notifications.forEach(element => {
      ids.push(element.id);
    });

    this.notifService.setRead(ids);
  }
}
