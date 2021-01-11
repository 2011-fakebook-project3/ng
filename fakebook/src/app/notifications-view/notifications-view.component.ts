import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../service/notifications.service';
import { Notification } from '../model/notification';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css'],
})
export class NotificationsViewComponent implements OnInit {

  // initialize for testing purposes only
  notifications: Notification[] = []
  notificationsView = false;
  unreadNotifications = false;

  constructor(
    private notifService: NotificationsService,
    ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    const newNotifs = this.notifService.notifications$;
    if (newNotifs.length > 0) {
      this.unreadNotifications = true;
      this.notifications.concat(newNotifs);
    }
  }

  toggleNotifications(): void {
    this.notificationsView = !this.notificationsView;
    if (this.notificationsView === true){
      this.unreadNotifications = false;
    }
  }
}
