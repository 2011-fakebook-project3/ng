import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  url = `${environment.baseUrls.posts}/api/`;

  constructor(private http: HttpClient, private auth: AuthService) {}


  like(likeableId: number, likeableResource : string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.auth.authorizationHeaderValue,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(`${this.url}${likeableResource}/${likeableId}/like/`, null)
      .toPromise()
      .then((res) => console.log(JSON.stringify(res)));
  }

  unlike(likeableId: number, likeableResource : string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.auth.authorizationHeaderValue,
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(`${this.url}${likeableResource}/${likeableId}/unlike/`, null)
      .toPromise();
  }

  handleError(error: any): any {
    console.error('An error occurred', error);
    return throwError(error.message || 'Like Error');
  }
}
