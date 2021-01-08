import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  getAccessToken(): void{

  }

  constructor() {
  }
}
