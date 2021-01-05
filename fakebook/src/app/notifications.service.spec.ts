import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Notification } from './model/notification';
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
      { userId: 1, postId: 1, type: 'Like' },
      { userId: 2, postId: 1, type: 'Comment' },
      { userId: 3, postId: undefined, type: 'Follow' },
      { userId: 4, postId: 2, type: 'Post' }
    ];

    service.notifications$.subscribe(value => {
      expect(value).toBe(testNotifications);
      done();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/notifications`);
    expect(req.request.method).toBe('GET');
    req.flush(testNotifications);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
