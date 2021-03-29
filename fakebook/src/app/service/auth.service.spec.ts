import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { NEVER } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockOktaAuthService = {
      $authenticationState: NEVER,
      isAuthenticated(): Promise<boolean> {
        return Promise.resolve(false);
      },
      signInWithRedirect(): void {},
      getUser(): Promise<UserClaims> {
        return Promise.resolve(new UserClaims(1, 'test'));
      },
      signOut(): void {},
      tokenManager: {
        clear(): void {},
      },
    };
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: {} },
        { provide: OktaAuthService, useValue: mockOktaAuthService },
      ],
    }).compileComponents();

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test contructor
  it('should set isAuthenticated to false in constructor', () => {
    service = new AuthService(
      TestBed.inject(OktaAuthService),
      TestBed.inject(Router)
    );
    expect(service.isAuthenticated).toBe(false);
  });

  // tests for updateAuthState
  it('should set isAuthenticated to false', () => {
    service.updateAuthState(false);
    expect(service.isAuthenticated).toBe(false);
  });

  it('should set isAuthenticated to true', () => {
    service.updateAuthState(true);
    expect(service.isAuthenticated).toBe(true);
  });

  // test for subscribeAuthStateChange
  it('should get updated state change to false', () => {
    service.subscribeAuthStateChange((authState: boolean) => {
      service.isAuthenticated = authState;
    });
    expect(service.isAuthenticated).toBe(false);
  });

  // test login
  it('should log in and redirect to newsfeed', () => {
    spyOn(service.oktaAuth, 'signInWithRedirect');
    service.login();
    expect(service.oktaAuth.signInWithRedirect).toHaveBeenCalled();
  });

  // test logout
  it('should log out and remove token', () => {
    spyOn(service.oktaAuth, 'signOut');
    spyOn(service.oktaAuth.tokenManager, 'clear');
    service.logout();
    expect(service.oktaAuth.signOut).toHaveBeenCalled();
    expect(service.oktaAuth.tokenManager.clear).toHaveBeenCalled();
  });
});

class UserClaims {
  Id: number;
  Name: string;
  constructor(id: number, name: string) {
    this.Id = id;
    this.Name = name;
  }
}
