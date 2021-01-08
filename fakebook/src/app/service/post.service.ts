import { Injectable } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  deleteComment(comment: Comment): void { }
}
