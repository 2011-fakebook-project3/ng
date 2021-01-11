import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Notification, LikeNotification, CommentNotification, PostNotification, FollowNotification } from '../model/notification';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotificationsService } from './notifications.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


describe('NotificationsService', () => {
  let service: NotificationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        NotificationsService,
      ]
    });
    service = TestBed.inject(NotificationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of notifications from observable', (done) => {

    const testNotifications: Notification[] = [
      { userId: '1', postId: 1, type: 'like', date: new Date() },
      { userId: '2', postId: 2, type: 'comment', date: new Date() },
      { userId: '3', type: 'follow', date: new Date() },
      { userId: '4', postId: 3, type: 'post', date: new Date() },
    ];

    expect(service.notificationsObs.subscribe).toBe(testNotifications);

    const req = httpMock.expectOne(`${environment.baseUrl}/notifications`);
    expect(req.request.method).toBe('GET');
    req.flush(testNotifications);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
