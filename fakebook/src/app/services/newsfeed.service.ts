import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NewsfeedService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  headers = {
    Authorization: this.auth.authorizationHeaderValue,
    Accept: 'application/json',
  };
  constructor(private http: HttpClient) {}

  getPosts(followers : string[]): Observable<Post[]> {
    const headers = {
          Authorization: this.auth.authorizationHeaderValue,
          Accept: 'application/json',
        };
    return this.http.post<Post[]>(
      `${environment.baseUrls.posts}/api/posts/newsfeed`, { emails: followers }
    );
  }

  getPostById(postId: number): Observable<Post> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };
    return this.http.get<Post>(
      `${environment.baseUrls.posts}/api/posts/${postId}`
    );
  }

  getUser(): Observable<User> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };
    return this.http.get<User>(`${environment.baseUrls.profile}/api/profiles/`);
  }
}
