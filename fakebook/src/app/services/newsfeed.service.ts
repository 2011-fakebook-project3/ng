import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { environment} from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private oktaAuth: AuthService, private http: HttpClient) { }
  url = `${environment.baseUrl}/someUrl`;
  getPosts(): Observable<Post[]> {
    const accessToken = this.oktaAuth.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    };
    return this.http.get<Post[]>(`${this.url}/`, { headers });
  }

}
