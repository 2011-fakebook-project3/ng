import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Post } from '../models/post';
import { User } from '../models/user';
import { environment} from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }
  url = `${environment.baseUrl}`;

  getPosts(): Observable<Post[]> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    return this.http.get<Post[]>(`${this.url}/someurl`, { headers });
  }

  getUser(): Observable<User>{
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    return this.http.get<User>(`${this.url}/someurl`, { headers });
  }

}