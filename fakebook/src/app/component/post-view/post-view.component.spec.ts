import { ComponentFixture, TestBed, fakeAsync, waitForAsync, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationBehaviorOptions , Router } from '@angular/router';
import { NEVER } from 'rxjs';

import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { Post } from '../../model/post';
import { PostViewComponent } from './post-view.component';
import { PostService } from '../../service/post.service';

describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;

  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'e@mail',
    phoneNumber: undefined,
    profilePictureUrl: null,
    status: undefined,
    birthDate: new Date(2010, 12),
  };

  const testComment: Comment = {
    id: 1,
    userId: 1,
    content: 'comment content',
    postId: 1,
    createdAt: undefined,
    user: undefined
  };

  const testPost: Post = {
    id: 1,
    content: 'string',
    user: testUser,
    pictureUrl: undefined,
    createdAt: new Date(2020, 12),
    likedByUserIds: [],
    commentIds: [1],
    comments: [testComment],
    liked: false
  };

  beforeEach(async () => {
    const mockPostService = {
      delete(id: number): void {}
    };

    await TestBed.configureTestingModule({
      declarations: [ PostViewComponent ],
      providers: [
        {provide: PostService, useValue: mockPostService},
        {provide: ActivatedRoute, useValue: {}}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PostViewComponent);
    component = new PostViewComponent(TestBed.inject(ActivatedRoute), TestBed.inject(PostService));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.comments).toBeNull();
    expect(component.userid).toBe(0);
  });

  it('should delete a post on deletePost()', () => {
    spyOn(component.postService, 'delete');
    component.deletePost(testPost);
    expect(component.post).toBeNull();
    expect(component.postService.delete).toHaveBeenCalled();
  });
});
