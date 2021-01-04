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
  }

  updateAuthState(isAuthenticated: boolean): void {
  }

  subscribeAuthStateChange(updateFn: (authState: boolean) => void): void {
  }

  login(): void {
  }

  logout(): void {
  }
}
