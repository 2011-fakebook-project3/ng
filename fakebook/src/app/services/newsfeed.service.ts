import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsfeedService {
  constructor(private http: HttpClient) {}

  getPosts(followers : string[]): Observable<Post[]> {
    return this.http.post<Post[]>(
      `${environment.baseUrls.posts}/api/posts/newsfeed`, followers
    );
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(
      `${environment.baseUrls.posts}/api/posts/${postId}`
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrls.profile}/api/profiles/`);
  }
}
