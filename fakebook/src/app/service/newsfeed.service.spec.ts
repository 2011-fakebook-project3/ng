import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Post } from '../models/post';
import { NewsfeedService } from './newsfeed.service';
import { AuthService } from '../service/auth.service';


describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const url = `${environment.baseUrl}`;


  const fakeAuthService = {
    accessToken: 'token',
     getAccessToken(): any {
      return this.accessToken;
    }
  };

  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'e@mail',
    phoneNumber: undefined,
    profilePictureUrl: undefined,
    status: undefined,
    birthDate: new Date(2010, 12)
   };

  const testPosts: Post[] = [
    { id: 1, content: 'content 1', createdAt: new Date(), pictureUrl: '', email: 'irene@email.com', comments: [] },
    { id: 2, content: 'content 2', createdAt: new Date(), pictureUrl: '', email: 'moriarty@email.com', comments: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { NewsfeedService }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new NewsfeedService(TestBed.inject(OktaAuthService), httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getPosts() should return list of posts',
    (done) => {

       const token = fakeAuthService.getAccessToken();

       httpClientSpy.get(url, { headers: {
        Authorization: 'Bearer ' + token,
      }}).and.returnValue(testPosts);

       service.getPosts()
        .subscribe(posts => {
          expect(posts).toEqual(testPosts);
          done();
        });

       const req = httpTestingController.expectOne(`${url}/someUrl`); // wating on what the endpoint

       expect(req.request.method).toEqual('GET');
       expect(req.request.headers).toBe(token);
       req.flush(testPosts);

       httpTestingController.verify();
    });

  it('getUser() should return a user',
    (done) => {

      const token = fakeAuthService.getAccessToken();

      httpClientSpy.get(url, { headers: {
       Authorization: 'Bearer ' + token,
     }}).and.returnValue(testUser);

      service.getUser()
       .subscribe(user => {
         expect(user).toEqual(testUser);
         done();
       });

      const req = httpTestingController.expectOne(`${url}/someUrl`); // wating on what the endpoint

      expect(req.request.method).toEqual('GET');
      expect(req.request.headers).toBe(token);
      req.flush(testPosts);

      httpTestingController.verify();
   });

});
