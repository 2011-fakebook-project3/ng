import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private http: HttpClient) {}
  url = `${environment.baseUrls.posts}/api`;

  follow(follower: User, followee: User): any {
    return this.http
      .post(`${this.url}/follows/${follower.id}`, null)
      .toPromise();
  }

  unfollow(follower: User, followee: User): any {
    return this.http
      .delete(`${this.url}/follows/${follower.id}`)
      .toPromise()
      .then((res) => console.log(JSON.stringify(res)));
  }

  getFollowStatus(follower: User, followee: User): boolean {
    return followee.followers.some((user) => user.email === follower.email);
  }
}
