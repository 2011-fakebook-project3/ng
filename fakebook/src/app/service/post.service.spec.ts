import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User} from 'src/app/model/user';
import { Comment } from 'src/app/model/comment';
import { PostService } from './post.service';
import { Post } from '../model/post';
import { of } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: { get: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy }; // spy with some functions
  let httpTestingController: HttpTestingController; // mock backend
  const url = `https://fakebook.revaturelabs.com/api/Posts`; // test base url

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

    service = new PostService(httpClientSpy as any, TestBed.inject(OktaAuthService));
  });

  it('should be created', () => {
    service = new PostService(TestBed.inject(HttpClient), TestBed.inject(OktaAuthService));
    expect(service).toBeTruthy();
  });

  it('should have correct access token and headers', () => {
    expect(service.headers.headers.Authorization).toBe('Bearer 0');
    expect(service.headers.headers.Accept).toBe('application/json');
  });

  it('should have the correct urls', () => {
    expect(service.baseUrl).toBe('https://fakebook.revaturelabs.com/');
    expect(service.url).toBe(`${service.baseUrl}/api/Posts`);
  });
});
