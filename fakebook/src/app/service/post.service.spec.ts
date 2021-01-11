import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User} from 'src/app/model/user';
import { Comment } from 'src/app/model/comment';
import { PostService } from './post.service';
import { Post } from '../model/post';
import { OktaAuthService } from '@okta/okta-angular';

describe('PostService', () => {
  let postService: PostService;
  let httpClientSpy: { get: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy }; // spy with some functions
  let oktaSpy: {};
  let httpTestingController: HttpTestingController; // mock backend
  const url = `testurl.net/api/Posts`; // test base url

  // some test data
  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'e@mail',
    phoneNumber: undefined,
    profilePictureUrl: null,
    status: undefined,
    birthDate: new Date(2010, 12),
  };

  const testComment: Comment = {
    id: 1,
    userId: 1,
    content: 'comment content',
    postId: 1,
    createdAt: undefined
  };

  const testPost: Post = {
    id: 1,
    content: 'string',
    userId: 1,
    pictureUrl: undefined,
    createdAt: new Date(2020, 12),
    likedByUserIds: [],
    commentIds: [1],
    liked: false
  };

  beforeEach(() => {
    const mockOktaAuthService = {
      getAccessToken(): string {
        return '0';
      }
    };
    const mockHttpClient = {};
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient},
        { provide: OktaAuthService, useValue: mockOktaAuthService}
      ]
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'post']);
    //oktaSpy = jasmine.createSpyObj('OktaAuthService');

    postService = new PostService(httpClientSpy as any, TestBed.inject(OktaAuthService));
  });

  it('should be created', () => {
    postService = new PostService(TestBed.inject(HttpClient), TestBed.inject(OktaAuthService));
    expect(postService).toBeTruthy();
  });

  // // GET
  // it('can test postService.getById', (done) => {

  //   httpClientSpy.get.and.returnValue(testPost);

  //   // make get request
  //   postService.getById(testPost.id)
  //     .subscribe(post =>
  //     {
  //       expect(post).toEqual(testPost);
  //       done();
  //     });

  //   // mock backend expects one request
  //   const req = httpTestingController.expectOne(`${url}/${testPost.id}`);

  //   expect(req.request.method).toEqual('GET');
  //   expect(req.request.body).toBeNull();
  //   expect(req.request.params.has(`${testPost.id}`)).toBeTrue();

  //   // Respond with mock data, causing Observable to resolve.
  //   // Subscribe callback asserts that correct data was returned.
  //   req.flush(testPost);

  //   // assert that there are no outstanding requests.
  //   httpTestingController.verify();
  // });

  // // POST
  // it('can test postService.create', (done) => {

  //   httpClientSpy.post.and.returnValue(testPost);

  //   // make post request
  //   postService.create(testPost)
  //     .subscribe(post =>
  //     {
  //       expect(post).toEqual(testPost);
  //       done();
  //     });

  //   // mock backend expects one request
  //   const req = httpTestingController.expectOne(`${url}`);

  //   // test features of request
  //   expect(req.request.method).toEqual('POST');
  //   expect(req.request.body).toEqual(testPost);
  //   expect(req.request.params.has(`${testPost}`)).toBeTrue();

  //   // resolve request to mock backend
  //   req.flush(testPost);

  //   // assert that there are no outstanding requests.
  //   httpTestingController.verify();
  // });
  // // DELETE
  // it('can test postService.delete', (done) => {

  //   httpClientSpy.delete.and.returnValue(testPost);

  //   // make delete request
  //   postService.delete(testPost.id)
  //   .subscribe(value =>
  //     {
  //       expect(value).toBeNull();
  //       done();
  //     });
  //   // mock backend expects one request
  //   const req = httpTestingController.expectOne(`${url}/${testPost.id}`);

  //   // test features of request
  //   expect(req.request.method).toEqual('DELETE');
  //   expect(req.request.body).toBeNull();
  //   expect(req.request.params.has(`${testPost.id}`)).toBeTrue();

  //   // resolve request to mock backend
  //   req.flush(null);

  //   // assert that there are no outstanding requests.
  //   httpTestingController.verify();
  // });
});
