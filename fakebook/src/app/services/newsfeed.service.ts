import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http: HttpClient) { }
  baseUrl = 'someUrl';
  url = `${this.baseUrl}/api/Posts`;

  getPosts(): Observable<Post[]> {
    return undefined as unknown as Observable<Post[]>;
  }

}
