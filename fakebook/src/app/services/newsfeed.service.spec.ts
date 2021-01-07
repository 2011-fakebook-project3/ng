import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { NewsfeedService } from './newsfeed.service';
import { AuthService } from './auth.service';


describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const url = `${environment.baseUrl}/someUrl`;


  const fakeAuthService = {
    accessToken: 'token',
     getAccessToken(): any {
      return this.accessToken;
    }
  };


  const testComments: Comment[] = [
    { id: 1, content: 'Comment Content 1', postId: 1, createdAt: new Date(), firstName: 'John', lastName: 'Watson' },
    { id: 2, content: 'Comment Content 2', postId: 1, createdAt: new Date(), firstName: 'Microft', lastName: 'Holmes' }
  ];

  const testPosts: Post[] = [
    { id: 1, content: 'content 1', createdAt: new Date(), pictureUrl: '', email: 'irene@email.com', comments: testComments },
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

    service = new NewsfeedService(TestBed.inject(AuthService), httpClientSpy as any);
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

       const req = httpTestingController.expectOne(`${url}`); // wating on what the endpoint

       expect(req.request.method).toEqual('GET');
       expect(req.request.headers).toBe(token);
       req.flush(testPosts);

       httpTestingController.verify();
    });


});
