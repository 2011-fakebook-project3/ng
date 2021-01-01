import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CommentNotification } from './model/comment-notification';
import { FollowNotification } from './model/follow-notification';
import { LikeNotification } from './model/like-notification';
import { PostNotification } from './model/post-notification';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  let testLikes: LikeNotification[] = [{ userId: 1, postId: 1 }]
  let testFollows: FollowNotification[] = [{ followerId: 1, followingId: 2 }]
  let testComments: CommentNotification[] = [{ userId: 1, postId: 1 }]
  let testPosts: PostNotification[] = [{ userId: 1, postId: 1 }]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of like notifications from observable', (done) => {
      service.likeNotifications$.subscribe(value => {
        expect(value).toBe(testLikes);
        done();
      })
  });

  it ('should return a list of post notifications from observable', (done) => {
      service.postNotifications$.subscribe(value => {
        expect(value).toBe(testPosts);
        done();
    })
  });

  it ('should return a list of comment notifications from observable', (done) => {
      service.commentNotifications$.subscribe(value => {
        expect(value).toBe(testComments);
        done();
      })
  });

  it ('should return a list of follow notifications from observable', (done) => {
      service.followNotifications$.subscribe(value => {
        expect(value).toBe(testFollows);
        done();
      })
  });

})
