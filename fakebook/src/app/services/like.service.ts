import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  url = `${environment.baseUrls.posts}/api/`;

  constructor(private http: HttpClient) {}

  like(postId: number): any {
    return this.http
      .post(`${this.url}Posts/${postId}/like/`, null)
      .toPromise()
      .then((res) => console.log(JSON.stringify(res)));
  }

  unlike(postId: number): any {
    return this.http
      .post(`${this.url}Posts/${postId}/unlike/`, null)
      .toPromise();
  }

  handleError(error: any): any {
    console.error('An error occurred', error);
    return throwError(error.message || 'Like Error');
  }
}
