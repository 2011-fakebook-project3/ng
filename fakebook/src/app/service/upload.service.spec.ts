import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    const mockHttpClient = {
      post(): Promise<{ path: string, userId: number }> {
        return Promise.resolve({path: '', userId: 0});
      }
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient}
      ]
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
