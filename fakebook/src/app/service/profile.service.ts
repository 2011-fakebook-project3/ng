import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Profile} from 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = `${environment.profile.url}/api/profiles/`;

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) { }

// headers for all function calls.
  headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.oktaAuth.getAccessToken()
    }
  };

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

  public GetProfile(email: string) :  Observable<Profile> /* profile */{

      return this.http.get<Profile>(this.baseUrl + email, this.headers);
  }

  public GetProfiles(emails: string[]) :  Observable<Profile> /* profile */{
    //make empty collection of profiles
    // emails={abc, 123, }

    return this.http.get<Profile>(this.baseUrl + "selection/" + emails, this.headers);
  }
  
  public createProfile(profile: Profile): Observable<Profile> {

    return this.http.post<Profile>(`${this.baseUrl}`, profile, this.headers);
  }
    
  public UpdateProfile(email: string, profile: Profile): Observable<Profile>
  {
    return this.http.put<Profile>(this.baseUrl + email, profile, this.headers); 
  }
}
