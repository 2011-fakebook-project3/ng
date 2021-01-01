import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User } from '../models/user';

import { NewsfeedService } from './newsfeed.service';

describe('NewsfeedService', () => {
  let service: NewsfeedService;

  let testUser: User = {
    id: 1,
    firstName: "Sherlock",
    lastName:  "Holmes",
    email: "sholmes@email.com",
    phoneNumber: undefined,
    password: "1234",
    profilePictureUrl: null,
    status: undefined,
    birthDate: new Date("2001-08-17"),
    followers: [],
    followees: []
  }

  let testPosts: Post[] = [
    {
      id: 1, 
      content: "content 1",
      user: testUser,
      createdAt: new Date(),
      likedByUserIds: [1, 2, 5],
      pictureUrl: "",
      commentIds: [1, 2, 3],
      comments: [],
      liked: true
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPost should return value from observable',
    (done) => {
      service.posts$.subscribe(value => {
        expect(value).toBe(testPosts);
        done();
      });
    });

    it('getPost should return content', 
      (done) => {
      service.posts$.subscribe(value => {
        expect(value[0].content).toBe("content 1");
        done();
      })
    });

});
