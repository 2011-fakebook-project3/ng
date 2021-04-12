import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

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

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = `${environment.baseUrls.profile}/api/profiles/`;
  headers: any;
  constructor(public http: HttpClient) {
    this.headers = {
      Authorization: 'Bearer ',
      Accept: 'application/json',
    };
  }

  public getProfileByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + email, { headers: this.headers });
  }

  public getProfileWithNullRoute(): Observable<User> {
    return this.http.get<User>(this.baseUrl, { headers: this.headers });
  }
  
  public getProfilesByEmails(emails: string[]): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'selection/' + emails, { headers: this.headers });
  }

  public createProfile(profile: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, profile, { headers: this.headers });
  }

  public updateProfile(email: string, profile: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + email, profile, { headers: this.headers });
  }
}
