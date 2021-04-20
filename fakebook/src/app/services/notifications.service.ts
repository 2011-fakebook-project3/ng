import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../model/notification';
import { ApiNotification } from '../model/api-notification';
import { AuthService } from './auth.service';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notifications: Subject<Notification[]> = new Subject<
    Notification[]
  >();
  private hubConnection: HubConnection;
  public notificationsObs = this.notifications.asObservable();
  private token = this.authService.oktaAuth.getAccessToken();

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {
    // initialize options so hub connection can use authorization
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        if (this.token === undefined) {
          return '';
        } else {
          return this.token;
        }
      },
    };

    // Start hub connection to SignalR
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrls.notifications}/notifications`, options)
      .build();
    this.hubConnection
      .start()
      .catch((error) => console.log('hub connection failed'))
      .then(() =>
        this.hubConnection.on('SendUserGroupAsync', (data) => {
          this.notifications.next(
            this.mapNotifications([data] as ApiNotification[])
          );
        })
      );
  }

  // mapping function that maps the received notification to the one that the component uses
  mapNotifications(dbNotif: ApiNotification[]): Notification[] {
    const notifs: Notification[] = [];

    dbNotif.forEach((element) => {
      notifs.push({
        id: element.id,
        userId: element.triggerUserId,
        type: element.type.key,
        date: element.date,
        postId: element.type.value,
      });
    });
    return notifs;
  }

  // function that sets all loaded notifications to read on the database
  setRead(ids: string[]): void {
    this.hubConnection.invoke('MarkNotificationAsReadAsync', ids);
  }

  // invokes the Create comment function on the signalR backend
  createCommentNotification(commenterEmail: string, postId: number): void {
    let posterEmail: string;

    // gets email of the post creator and sends a new notification to the backend
    this.postService.getById(postId).subscribe((post) => {
      posterEmail = post.userEmail;

      const notif: ApiNotification = {
        id: '',
        date: new Date(Date.now()),
        triggerUserId: commenterEmail,
        loggedInUserId: posterEmail,
        type: { key: 'comment', value: 0 },
        hasBeenread: false,
      };
      this.hubConnection.invoke('CreateNotification', notif);
    });
  }
}
