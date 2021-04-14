import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) {}
  url = `${environment.baseUrls.posts}/api`;

  follow(follower: User, followee: User): any {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http
      .post(`${this.url}/follows/${follower.id}`, null, { headers })
      .toPromise();
  }

  unfollow(follower: User, followee: User): any {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http
      .delete(`${this.url}/follows/${follower.id}`, { headers })
      .toPromise()
      .then((res) => console.log(JSON.stringify(res)));
  }

  getFollowStatus(follower: User, followee: User): boolean {
    return followee.followers.some((user) => user.email === follower.email);
  }
}
