import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  url = `${environment.baseUrls.posts}/api/`;

  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) {}

  like(likeableId: number, likeableResource : string): any {
    const accessToken = this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    return this.http
      .post(`${this.url}${likeableResource}/${likeableId}/like/`, null, httpOptions).subscribe(()=> {});
  }

  unlike(likeableId: number, likeableResource : string): any {
    const accessToken = this.oktaAuth.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post(`${this.url}${likeableResource}/${likeableId}/unlike/`, null, httpOptions)
      .toPromise();
  }

  handleError(error: any): any {
    console.error('An error occurred', error);
    return throwError(error.message || 'Like Error');
  }
}
