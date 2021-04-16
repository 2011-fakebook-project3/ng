import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from '../authentication/core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = `${environment.baseUrls.profile}/api/profiles/`;

  constructor(public http: HttpClient, private auth: AuthService) {}

  /*
    endpoints:
        api/profiles/
      ✔ [GET]         /profiles/{email}
          + if email is null, check for currently logged in user
      ✔ [GET]         /profiles/selection/{emails}
          + used to get a collection of profiles by their emails
      ✔ [POST]        /profiles/
          + used for creating users
          + takes in a `ProfileApiModel` as the request body
      ✔ [PUT][AUTH]   /profiles/
          + only works for currently logged in user
          + used for updating the current user
      - [POST]        /profiles/upload
          + uploads an image via a form (input type='file')
  */
  public GetProfile(email: string): Observable<User> /* profile */ {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    return this.http.get<User>(this.baseUrl + email, { headers });
  }

  public GetProfileWithNullRoute(): Observable<User> /* null route */ {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };
    return this.http.get<User>(this.baseUrl + this.auth.email, { headers });
  }
  public GetProfiles(emails: string[]): Observable<User> /* profile */ {
    // make empty collection of profiles
    // emails={abc, 123, }
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    return this.http.get<User>(this.baseUrl + 'selection/' + emails, {
      headers,
    });
  }

  public createProfile(profile: User): Observable<User> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    return this.http.post<User>(`${this.baseUrl}`, profile, { headers });
  }

  public UpdateProfile(email: string, profile: User): Observable<User> {
    const headers = {
      Authorization: this.auth.authorizationHeaderValue,
      Accept: 'application/json',
    };

    return this.http.put<User>(this.baseUrl + email, profile, { headers });
  }
}
