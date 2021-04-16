import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { environment } from 'src/environments/environment';
import { NewComment } from '../model/newcomment';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = `${environment.baseUrls.posts}/api/comments`;

  constructor(private http: HttpClient) {}

  create(comment: NewComment): Promise<NewComment> {
    const targetUrl = `/${this.url}`;

    return this.http.post<Comment>(targetUrl, comment).toPromise();
  }

  delete(comment: Comment): Promise<number> {
    const targetUrl = `/${this.url}/${comment.id}`;

    return this.http.delete<number>(targetUrl).toPromise();
  }

  get(commentId: number): Promise<Comment> {
    const targetUrl = `/${this.url}/${commentId}`;

    return this.http.get<Comment>(targetUrl).toPromise();
  }
}
