import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // test url
  url = `https://2011-project2-fakebook.azurewebsites.net/api/`; // url of the api

  // Get the user's information
  // Returns: An Observable.
  getUser(id: string | undefined): Observable<User> {
    return this.http.get<User>(`${this.url}User/${id}`);
  }
}
