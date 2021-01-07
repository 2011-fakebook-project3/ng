import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAccessToken() {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
