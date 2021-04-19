import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../authentication/core/authentication/auth.service';
import { Observable, of } from 'rxjs';

import { FollowService } from './follow.service';

describe('FollowService', () => {
  let service: FollowService;

  const mockHttpClient = {
    post(url: string, body: any): Observable<any> {
      return of(true);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: AuthService, useValue: {} },
      ],
    });
    service = TestBed.inject(FollowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expect follow to not throw error', () => {
    expect(() => {
      service.follow('jwerner@revature.net');
    }).not.toThrow();
  });

  it('should expect unfollow to not throw error', () => {
    expect(() => {
      service.unfollow('jwerner@revature.net');
    }).not.toThrow();
  });
});
