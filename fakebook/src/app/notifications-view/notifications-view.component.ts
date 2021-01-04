import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css']
})
export class NotificationsViewComponent implements OnInit {

  notifications: Notification[] | undefined;

  constructor(private service: NotificationsService) { }

  ngOnInit(): void {
  }

  getNotifications(): void {
    this.service.Notifications$.subscribe(value => this.notifications = value)
  }

}
