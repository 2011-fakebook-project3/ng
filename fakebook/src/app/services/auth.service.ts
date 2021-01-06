import { Injectable, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean | unknown;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    this.updateAuthState(false);
    this.oktaAuth.$authenticationState.subscribe((isAuthenticated) =>
    this.updateAuthState(isAuthenticated)
    );
  }

  updateAuthState(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
    if (isAuthenticated) {
      this.oktaAuth.getUser().then(console.log);
    }
  }

  subscribeAuthStateChange(updateFn: (authState: boolean) => void): void {
    this.oktaAuth.$authenticationState.subscribe((authState) => updateFn(authState));
  }

  login(): void {
    this.oktaAuth.signInWithRedirect({
      originalUri: 'newsfeed'
    });
  }

  logout(): void {
    this.oktaAuth.signOut();
    this.oktaAuth.tokenManager.clear();
  }
}
