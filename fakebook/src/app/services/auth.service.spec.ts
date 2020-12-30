import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { NEVER } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  let mockOktaAuthService = {
    $authenticationState: NEVER
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: {} },
        { provide: OktaAuthService, useValue: mockOktaAuthService }
      ]

    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   

  it('should return true if autheticated', () => {
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false if not autheticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

});
