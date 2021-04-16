import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Comment } from '../model/comment';
import { User } from '../model/user';
import { Post } from '../model/post';
import { NewsfeedService } from './newsfeed.service';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';

describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const url = `${environment.baseUrls.posts}`;

  beforeEach(() => {
    const mockOktaAuthService = {
      getAccessToken(): string {
        return '0';
      },
    };

    const mockHttpClient = {};

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new NewsfeedService(httpClientSpy as any);
  });

  it('should be created', () => {
    service = new NewsfeedService(TestBed.inject(HttpClient));
    expect(service).toBeTruthy();
  });
});
