import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class ProfileSearchDataService {
  searchOption: any[] = [];
  public searchData!: User[];
  profileUrl = `${environment.baseUrls.profile}/api/profiles/`; 

  constructor(private http: HttpClient, oktaAuth: OktaAuthService) { }
  
  getProfiles(): Observable<User[]>{
    return this.http.get<User[]>(this.profileUrl);
    
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
