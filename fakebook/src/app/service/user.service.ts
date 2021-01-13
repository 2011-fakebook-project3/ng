import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = `${environment.baseUrl}/api/`;

  // Get the user's information
  // Returns: An Observable.
  getUser(id: string | undefined): Observable<User> {
    return this.http.get<User>(`${this.url}User/${id}`);
  }
}
