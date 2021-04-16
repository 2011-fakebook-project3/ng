import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import {
  HttpClient,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { NewsfeedService } from './newsfeed.service';
import { AuthService } from '../authentication/core/authentication/auth.service';

describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  const url = `${environment.baseUrls.posts}`;

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

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new NewsfeedService(
      httpClientSpy as any,
      TestBed.inject(AuthService)
    );
  });

  it('should be created', () => {
    service = new NewsfeedService(
      TestBed.inject(HttpClient),
      TestBed.inject(AuthService)
    );
    expect(service).toBeTruthy();
  });

  it('should have correct access token and headers', () => {
    expect(service.headers.Authorization).toBe('Bearer 0');
    expect(service.headers.Accept).toBe('application/json');
  });
});
