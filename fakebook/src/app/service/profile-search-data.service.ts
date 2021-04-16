import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { userInfo } from 'node:os';
import {ProfileService} from '../service/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileSearchDataService {
  searchOption: any[] = [];
  public searchData!: User[];
  profileUrl = `${environment.baseUrls.profile}/api/profiles/`; 

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService, private profileService: ProfileService) { }
  
  getProfile(email: string): Observable<User[]>{
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    
    return this.http.get<User[]>(this.profileUrl + email, { headers });
    
  }

  filteredSearchOptions() {
    let profiles = this.searchData;
    let filteredProfilesList = [];
    for (let profile of profiles){
      for(let options of this.searchOption) {
        if(options.firstName === profile.firstName) {
          filteredProfilesList.push(profile);
        }
      }
    }
    return filteredProfilesList;
  }

}
