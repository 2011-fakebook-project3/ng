import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


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
  const url = `${environment.baseURL}`;


  beforeEach(() => {

    const mockOktaAuthService = {
      getAccessToken(): string {
        return '0';
      }
    };

    const mockHttpClient = {};

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient},
        { provide: OktaAuthService, useValue: mockOktaAuthService}

      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new NewsfeedService(httpClientSpy as any, TestBed.inject(OktaAuthService));
  });


  it('should be created', () => {
    service = new NewsfeedService(TestBed.inject(HttpClient), TestBed.inject(OktaAuthService));
    expect(service).toBeTruthy();
  });



  it('should have correct access token and headers', () => {
    expect(service.headers.Authorization).toBe('Bearer 0');
    expect(service.headers.Accept).toBe('application/json');
  });


  it('should have the correct urls', () => {
    expect(service.url).toBe('http://localhost:4200/');
  });

});
