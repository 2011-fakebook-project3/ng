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
  let httpTestingController: HttpTestingController; // mock backend
  const url = `testurl.net/api/Posts`; // test base url

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

    postService = new PostService(httpClientSpy as any, TestBed.inject(OktaAuthService));
  });

  it('should be created', () => {
    postService = new PostService(TestBed.inject(HttpClient), TestBed.inject(OktaAuthService));
    expect(postService).toBeTruthy();
  });
});
