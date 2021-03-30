import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Comment } from 'src/app/model/comment';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = `${environment.baseUrls.posts}/api/comments`;

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {}

  create(comment: Comment): Promise<Comment> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };

    const targetUrl = `/${this.url}`;

    return this.http
      .post<Comment>(targetUrl, comment, { headers })
      .toPromise();
  }

  delete(comment: Comment): Promise<number> {
    const accessToken = this.oktaAuth.getAccessToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };

    const targetUrl = `/${this.url}/${comment.id}`;

    return this.http
      .delete<number>(targetUrl, { headers })
      .toPromise();
  }

  get(commentId: number): Promise<Comment> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };

    const targetUrl = `/${this.url}/${commentId}`;

    return this.http
      .get<Comment>(targetUrl, { headers })
      .toPromise();
  }
}
