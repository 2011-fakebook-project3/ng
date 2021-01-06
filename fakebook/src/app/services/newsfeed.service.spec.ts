import { TestBed } from '@angular/core/testing';
import { environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Followee } from '../models/followee';
import { NewsfeedService } from './newsfeed.service';


// getfollowees() That return a list of followes (just user id & user email), what would be the endpoint for this request
// getpost() that return a list of posts( 3 -4), what would be the endpoint for this request
//getcomments() returns a list of comments for each post. (what would be the endpoint for each request)
describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const url = environment.baseUrl;

  const testUser: User = {
    id: 1,
    firstName: 'Sherlock',
    lastName: 'Holmes',
    email: 'sholmes@email.com',
    phoneNumber: undefined,
    profilePictureUrl: '',
    status: undefined,
    birthDate: new Date('2001-08-17'),
  };

  const followees: Followee[] = [
    {id: 1, email:'sHolemes@email.com'},
    {id: 2, email:'gHouse@email.com'}
  ]

  const testComment: Comment = {
    id: 1,
    content: 'Comment Content 1',
    postId: 1,
    createdAt: new Date(),

  };

  const testPosts: Post[] = [
    {
      id: 1,
      content: 'content 1',
      createdAt: new Date(),
      pictureUrl: '',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        NewsfeedService,
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new NewsfeedService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPost should return list of posts',
    (done) => {
      httpClientSpy.get.and.returnValue(testPosts);

      service.getPosts()
        .subscribe(post => {
          expect(post).toEqual(testPosts);
          done();
        });

      const req = httpTestingController.expectOne(`${url}/Posts`);

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });

  it('getPost() should return content of posts',
    (done) => {
      httpClientSpy.get.and.returnValue(testPosts);

      service.getPosts().subscribe(post => {
        expect(post[0].content).toBe('content 1');
        done();
      });
      const req = httpTestingController.expectOne(`${url}/Posts`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });

  it('getPost() should return users',
    (done) => {
      httpClientSpy.get.and.returnValue(testPosts);

      service.getPosts().subscribe(post => {
        expect(post[0].user).toBe(testUser);
        done();
      });
      const req = httpTestingController.expectOne(`${url}/Posts`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });

  it('getPost() should return comments ',
    (done) => {
      httpClientSpy.get.and.returnValue(testPosts);

      service.getPosts().subscribe(post => {
        expect(post[0].comments[0].content).toBe('Comment Content 1');
        done();
      });
      const req = httpTestingController.expectOne(`${url}/Posts`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });


});
