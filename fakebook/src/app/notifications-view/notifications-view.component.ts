import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification, LikeNotification, PostNotification, CommentNotification, FollowNotification } from '../model/notification';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css'],
})
export class NotificationsViewComponent implements OnInit {

  notifications: Notification[] | undefined;
  notificationsView = false;

  constructor(
    private notifService: NotificationsService,
    ) { }

  ngOnInit(): void {
    // for testing purposes only
    /*this.notifications = [
      { userId: 1, postId: 1, type: 'Like' },
      { userId: 2, postId: 1, type: 'Comment' },
      { userId: 3, type: 'Follow' },
      { userId: 4, postId: 2, type: 'Post' },
    ];*/
  }

  getNotifications(): void {
    this.notifications = this.notifService.notifications$;
  }

  toggleNotifications(): void {
    this.notificationsView = !this.notificationsView;
  }

}
