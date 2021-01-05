import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { User } from '../models/user';
import { Post } from '../models/post';
import { NewsfeedService } from './newsfeed.service';

describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const url = `testurl.net/api/Posts`;

  const testUser: User = {
    id: 1,
    firstName: 'Sherlock',
    lastName: 'Holmes',
    email: 'sholmes@email.com',
    phoneNumber: undefined,
    password: '1234',
    profilePictureUrl: null,
    status: undefined,
    birthDate: new Date('2001-08-17'),
    followers: [],
    followees: []
  };

  const testPosts: Post[] = [
    {
      id: 1,
      content: 'content 1',
      user: testUser,
      createdAt: new Date(),
      likedByUserIds: [1, 2, 5],
      pictureUrl: '',
      commentIds: [1, 2, 3],
      comments: [],
      liked: true
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

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'post']);

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

      const req = httpTestingController.expectOne(`${url}`);

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });

  it('getPost should return content of post',
    (done) => {
      service.getPosts().subscribe(post => {
        expect(post[0].content).toBe('content 1');
        done();
      });
      const req = httpTestingController.expectOne(`${url}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });

  it('getPost should return user',
    (done) => {
      service.getPosts().subscribe(post => {
        expect(post[0].user).toBe(testUser);
        done();
      });
      const req = httpTestingController.expectOne(`${url}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });

  it('getPost should return comment Ids',
    (done) => {
      service.getPosts().subscribe(post => {
        expect(post[0].commentIds[1]).toBe(2);
        done();
      });
      const req = httpTestingController.expectOne(`${url}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toBeNull();
      req.flush(testPosts);

      httpTestingController.verify();
    });


});
