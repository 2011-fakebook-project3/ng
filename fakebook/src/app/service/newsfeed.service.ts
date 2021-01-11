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

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) { }
  url = `${environment.baseUrl}`;

  headers = {
    Authorization: 'Bearer ' + this.oktaAuth.getAccessToken(),
    Accept: 'application/json',
  };

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/api/posts`);
  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.url}/api/user`);
  }

}
