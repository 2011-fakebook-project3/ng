import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = `${environment}/api/profiles/`;

  constructor(public http: HttpClient, private oktaAuth: OktaAuthService) { }

// headers for all function calls.
  headers = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.oktaAuth.getAccessToken()
    }
  };

  public GetProfile(email: string): Observable<User> /* profile */{

    return this.http.get<User>(this.baseUrl + email, this.headers);
  }

  // If you click on a user and want to see their posts
  public GetUserPosts(email: string): Observable<Post[]> {
    // Fake Route!
    return this.http.get<Post[]>(this.baseUrl + email, this.headers);
  }

  // If you are on your own profile
  public GetOwnPosts(): Observable<Post[]> {

    return this.http.get<Post[]>(`${environment}/api/posts`, this.headers);
  }
}
