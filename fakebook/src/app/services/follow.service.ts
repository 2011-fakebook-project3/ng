import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private http: HttpClient) {}
  url = `${environment.baseUrls.profile}/api/profiles`;

  follow(follower: string): any {
    return this.http
      .post(`${this.url}/follow/${follower}`, null)
      .toPromise();
  }

  unfollow(follower: string): any {
    return this.http
      .post(`${this.url}/unfollow/${follower}`, null)
      .toPromise();
  }

  getFollowStatus(follower: User, followee: User): boolean {
    return followee.followers.some((user) => user === follower.email);
  }
}
