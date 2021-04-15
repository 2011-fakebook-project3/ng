import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = `${environment.baseUrls.posts}/api/comments`;

  constructor(private auth: AuthService, private http: HttpClient) {}

  create(comment: Comment): Promise<Comment> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    const targetUrl = `/${this.url}`;

    return this.http
      .post<Comment>(targetUrl, comment, { headers })
      .toPromise();
  }

  delete(comment: Comment): Promise<number> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    const targetUrl = `/${this.url}/${comment.id}`;

    return this.http
      .delete<number>(targetUrl, { headers })
      .toPromise();
  }

  get(commentId: number): Promise<Comment> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    const targetUrl = `/${this.url}/${commentId}`;

    return this.http
      .get<Comment>(targetUrl, { headers })
      .toPromise();
  }
}
