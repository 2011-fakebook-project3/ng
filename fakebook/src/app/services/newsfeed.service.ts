import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private oktaAuth: AuthService, private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return undefined as unknown as Observable<Post[]>;
  }

}
