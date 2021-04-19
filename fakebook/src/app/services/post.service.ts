import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { NewPost } from '../model/newpost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  url = `${environment.baseUrls.posts}/api/posts`;

  create(post: NewPost): Promise<Post> {
    return this.http
      .post<Post>(`${this.url}`, post)
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
    return this.http.put<Post>(`${this.url}/${post.id}`, post);
  }
}
