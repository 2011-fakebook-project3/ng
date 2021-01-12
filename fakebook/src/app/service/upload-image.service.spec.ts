import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';

import { UploadImageService } from './upload-image.service';

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeEach(() => {
    const mockOktaAuthService = {
      getAccessToken(): string {
        return '';
      }
    };
    const mockHttpClient = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: OktaAuthService, useValue: mockOktaAuthService}
      ]
    }).compileComponents();
    service = TestBed.inject(UploadImageService);
  });

  it('should be created', () => {
    service = new UploadImageService(TestBed.inject(HttpClient), TestBed.inject(OktaAuthService));
    expect(service).toBeTruthy();
    expect(service.baseUrl).toBe('http://localhost:4200/api/profiles/');
  });
});
