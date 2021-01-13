import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient, private oktaAuth: OktaAuthService) { }

  // headers for all function calls.
  headers = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.oktaAuth.getAccessToken()
    }
  };

    // If you click on a user and want to see their posts
    public GetUserPosts(email: string): Observable<Post[]> {
      return this.http.get<Post[]>(`${environment}/api/posts/${email}`, this.headers);
    }

      // If you are on your own profile
    public GetOwnPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(`${environment}/api/posts`, this.headers);
    }
}
