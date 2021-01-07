import { ComponentFixture, TestBed, fakeAsync, waitForAsync, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationBehaviorOptions , Router } from '@angular/router';
import { NEVER } from 'rxjs';

import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { Post } from '../../model/post';
import { PostViewComponent } from './post-view.component';

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
    await TestBed.configureTestingModule({
      declarations: [ PostViewComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a post if one exists', () => {
    const showPost = fixture.debugElement.query(By.css('.post')).nativeElement;
    expect(showPost.tagName).toBe('div');
    expect(showPost.attribute).toContain('*ngIf');
  });

  it('should delete a post on deletePost()', () => {
    component.deletePost(testPost);
    expect(testPost).toBeUndefined();
  });
});
