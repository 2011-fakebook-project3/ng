import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
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
  profileList: User[] = [];
  baseUrl = `${environment.baseUrls.profile}/api/profiles/`;
  token;
  headers: any;
  constructor(public http: HttpClient, private oktaAuth: OktaAuthService) {
    this.token = this.oktaAuth.getAccessToken();
    this.headers = {
      Authorization: 'Bearer ' + this.token
    };
  }

  public GetProfileByEmail(email: string): Observable<User> {
    const headers = {
      Authorization: 'Bearer ' + this.token
    };
    
    return this.http.get<User>(`${this.baseUrl}`, {params: new HttpParams({fromObject: {
      'email': email
    }} as HttpParamsOptions), headers: this.headers});
  }

  public GetProfileWithNullRoute(): Observable<User> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    
    return this.http.get<User>(this.baseUrl, { headers });
  }
  
  public GetProfilesByEmails(emails: string[]): Observable<User[]> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.get<User[]>(this.baseUrl + 'selection/' + emails, { headers });
  }

  public CreateProfile(profile: User): Observable<User> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    
    return this.http.post<User>(`${this.baseUrl}`, profile, { headers });
  }

  public UpdateProfile(email: string, profile: User): Observable<User> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };

    return this.http.put<User>(this.baseUrl + email, profile, { headers });
  }

  public GetProfileByName(name: string): Observable<User[]>{
    const headers = {
      Authorization: 'Bearer ' + this.token
    };
    
    return this.http.get<User[]>(`${this.baseUrl}` + 'search', {params: new HttpParams({fromObject: {
      'name': name
    }} as HttpParamsOptions), headers: this.headers});
  }
}
