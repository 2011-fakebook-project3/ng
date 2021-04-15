// import { TestBed } from '@angular/core/testing';
// import { Observable } from 'rxjs';
// import {
//   Notification,
//   LikeNotification,
//   CommentNotification,
//   PostNotification,
//   FollowNotification,
// } from '../model/notification';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { NotificationsService } from './notifications.service';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';
// import { OktaAuthService } from '@okta/okta-angular';
// import { Post } from '../model/post';
// import { PostService } from './post.service';

// describe('NotificationsService', () => {
//   let service: NotificationsService;

//   const mockOktaAuthService = {
//     getAccessToken(): string {
//       return 'token';
//     },
//   };

//   const mockAuthService = {
//     oktaAuth: mockOktaAuthService,
//   };

//   const mockPostService = {
//     getById(id: number): Observable<Post> {
//       return new Observable<Post>();
//     },
//   };

//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: AuthService, useValue: mockAuthService },
//         { provide: OktaAuthService, useValue: mockOktaAuthService },
//         { provide: PostService, useValue: mockPostService },
//         { provide: HttpClient, useValue: {} },
//       ],
//     }).compileComponents();

//     service = TestBed.inject(NotificationsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
