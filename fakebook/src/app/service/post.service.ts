import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OktaAuthService, OktaCallbackComponent } from '@okta/okta-angular';

import { Post } from '../model/post';
import { NewPost } from '../model/newpost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) { }
  baseUrl = 'https://fakebook.revaturelabs.com/';
  url = `${this.baseUrl}/api/Posts`; // TODO: update with our base url

  headers = {
    headers: {
      Authorization: 'Bearer ' + this.oktaAuth.getAccessToken(),
      Accept: 'application/json',
    }
  };

  create(post: NewPost): Observable<NewPost> {
    return this.http.post<NewPost>(`${this.url}`, post, this.headers);
  }

  likePost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.url}/${id}/like`, id, this.headers);
  }

  unLikePost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.url}/${id}/unlike`, id, this.headers);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`, this.headers);
    }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}`, this.headers);
    }

  delete(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${postId}`, this.headers);
  }
  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${post.id}`, post, this.headers);
  }

}
