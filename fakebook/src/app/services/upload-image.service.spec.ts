import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

import { UploadImageService } from './upload-image.service';

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeEach(() => {
    const mockAuthService = {
      get authorizationHeaderValue(): string {
        return "Bearer 0";
      }
    };
    const mockHttpClient = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    service = TestBed.inject(UploadImageService);
  });

  it('should be created', () => {
    service = new UploadImageService(
      TestBed.inject(HttpClient),
      TestBed.inject(AuthService)
    );
    expect(service).toBeTruthy();
    expect(service.url).toBe(`${environment.baseUrls.profile}/api/profiles/`);
  });
});
