import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Followee } from '../models/followee';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http: HttpClient) { }

  getPosts(followeeId: number): Observable<Post[]> {
    return undefined as unknown as Observable<Post[]>;
  }

  getFollowees(userId: number): Observable<Followee[]> {
    return undefined as unknown as Observable<Followee[]>;
  }

  getComments(postId: number): Observable<Comment[]>{
    return undefined as unknown as Observable<Comment[]>;
  }

}
