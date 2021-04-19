import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostService } from './post.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: {
    get: jasmine.Spy;
    delete: jasmine.Spy;
    post: jasmine.Spy;
  }; // spy with some functions
  let httpTestingController: HttpTestingController; // mock backend
  const url = `https://fakebook.revaturelabs.com/api/Posts`; // test base url

  beforeEach(() => {
    const mockAuthService = {
      get authorizationHeaderValue(): string {
        return "Bearer 0";
      }
    };
    const mockHttpClient = {};
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'delete',
      'post',
    ]);

    service = new PostService(
      httpClientSpy as any,
      TestBed.inject(AuthService)
    );
  });

  it('should be created', () => {
    service = new PostService(
      TestBed.inject(HttpClient),
      TestBed.inject(AuthService)
    );
    expect(service).toBeTruthy();
  });

  it('should have the correct urls', () => {
    expect(service.url).toBe(`${environment.baseUrls.posts}/api/posts`);
  });
});
