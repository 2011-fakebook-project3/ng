import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

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
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    service = new ProfileService(
      TestBed.inject(HttpClient),
      TestBed.inject(AuthService)
    );
    expect(service).toBeTruthy();
    expect(service.baseUrl).toBe(`${environment.baseUrls.profile}/api/profiles/`);
  });
});
