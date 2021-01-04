import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }
  baseUrl : string = 'someUrl';
  url = `${this.baseUrl}/api/Posts`; //update with our base url

  create(post: Post): Observable<Post> {
    return undefined as unknown as Observable<Post>;
  }

  getById(id: number): Observable<Post> {
    return undefined as unknown as Observable<Post>;
    }

  delete(postId: number): Observable<void> {
    return undefined as unknown as Observable<void>; 
  }
}
