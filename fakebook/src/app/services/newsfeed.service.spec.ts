import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import {
  HttpClient,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { NewsfeedService } from './newsfeed.service';

describe('NewsfeedService', () => {
  let service: NewsfeedService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    const mockHttpClient = {};

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new NewsfeedService(
      httpClientSpy as any,
    );
  });

  it('should be created', () => {
    service = new NewsfeedService(
      TestBed.inject(HttpClient),
    );
    expect(service).toBeTruthy();
  });
});
