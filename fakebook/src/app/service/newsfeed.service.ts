import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Post } from '../model/post';
import { User } from '../model/user';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService, ) { }
  baseUrl = 'https://fakebook.revaturelabs.com';
  url = `${this.baseUrl}`;

  headers = {
    Authorization: 'Bearer ' + this.oktaAuth.getAccessToken(),
    Accept: 'application/json',
  };

  getPosts(): Observable<Post[]> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    return this.http.get<Post[]>(`${this.url}/api/posts/newsfeed`, { headers });
  }

  getUser(): Observable<User>{
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    return this.http.get<User>(`${this.url}/api/profiles/`, { headers });
  }

}
