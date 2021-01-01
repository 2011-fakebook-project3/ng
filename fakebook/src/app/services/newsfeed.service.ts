import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post'

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  
  constructor() { }
  
  get posts$(): Observable<Post[]>{
    return this.getPostObservable();
  }
  
  getPostObservable(): Observable<Post[]> {
    return undefined as unknown as Observable<Post[]>;
  }
  
}
