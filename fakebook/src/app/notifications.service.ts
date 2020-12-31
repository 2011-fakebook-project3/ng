import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { CommentNotification } from './model/comment-notification';
import { FollowNotification } from './model/follow-notification';
import { LikeNotification } from './model/like-notification';
import { PostNotification } from './model/post-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  get likeNotifications$(): Observable<LikeNotification[]> {
    return this.getLikeObservable();
  }

  get followNotifications$(): Observable<FollowNotification[]> {
    return this.getFollowObservable();
  }

  get commentNotifications$(): Observable<CommentNotification[]> {
    return this.getCommentObservable();
  }

  get postNotifications$(): Observable<PostNotification[]> {
    return this.getPostObservable();
  }

  getLikeObservable(): Observable<LikeNotification[]> {
    return undefined as unknown as Observable<LikeNotification[]>
  }

  getFollowObservable(): Observable<FollowNotification[]> {
    return undefined as unknown as Observable<FollowNotification[]>;
  }

  getCommentObservable(): Observable<CommentNotification[]> {
    return undefined as unknown as Observable<CommentNotification[]>;
  }

  getPostObservable(): Observable<PostNotification[]>{
    return undefined as unknown as Observable<PostNotification[]>;
  }
}
