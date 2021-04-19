import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { NewPost } from '../model/newpost';
import { AuthService } from '../authentication/core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  url = `${environment.baseUrls.posts}/api/posts`;

  headers = {
    headers: {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    },
  };

  create(post: NewPost): Promise<NewPost> {
    return this.http
      .post<NewPost>(`${this.url}`, post, this.headers)
      .toPromise();
  }

  likePost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.url}/${id}/like`, id);
  }

  unLikePost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.url}/${id}/unlike`, id);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  getUserPosts(email: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/user/${email}`);
  }

  delete(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${postId}`);
  }
  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${post.id}`, post, this.headers);
  }
}
