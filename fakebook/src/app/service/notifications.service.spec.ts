import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Notification, LikeNotification, CommentNotification, PostNotification, FollowNotification } from '../model/notification';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotificationsService } from './notifications.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockAuthService = {
    getAccessToken(): string {
      return "token";
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        NotificationsService,
        { provide: AuthService, useValue: mockAuthService },

      ]
    });
    service = new NotificationsService(TestBed.inject(AuthService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
