import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { NEVER } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {

    const mockOktaAuthService = {
      $authenticationState: NEVER,
      isAuthenticated(): Promise<boolean> {
        return Promise.resolve(false);
      }
    }
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: {} },
        { provide: OktaAuthService, useValue: mockOktaAuthService }
      ]
    }).compileComponents();

    service = TestBed.inject(AuthService);
  });

  it('should set isAuthenticated to false', () =>{
    service.updateAuthState(false);
    expect(service.isAuthenticated).toBe(false);
  })

  it('should set isAuthenticated to true', () =>{
    service.updateAuthState(true);
    expect(service.isAuthenticated).toBe(true);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and redirect to newsfeed', () => {
    spyOn(login)
    service.login()
  });
   

  it('should return true if authenticated', () => {
    expect(service.isAuthenticated).toBe(true);
  });

  it('should return false if not authenticated', () => {
    expect(service.isAuthenticated).toBe(false);
  });

});
