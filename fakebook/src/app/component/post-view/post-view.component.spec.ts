import { PostViewComponent } from './post-view.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationBehaviorOptions,
  Router,
} from '@angular/router';
import { NEVER, Observable, of } from 'rxjs';

import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';

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
    following: [],
    followers: [],
  };

  const testComment: Comment = {
    id: 1,
    userEmail: 'e@email.com',
    content: 'comment content',
    postId: 1,
    createdAt: undefined,
  };

  const testPost: Post = {
    id: 1,
    content: 'string',
    userEmail: 'e@mail',
    pictureUrl: undefined,
    createdAt: new Date(2020, 12),
    likes: [],
    comments: [],
  };

  const fakeHTTPClient = {};
  const fakeOktaAuth = { getAccessToken(): void {} };
  class Subscribable {
    subscribe() :void {}
  }
  beforeEach(async () => {
    const mockPostService = {
      delete(id: number): Subscribable { return new Subscribable(); },
      update(post : Post): Subscribable { return new Subscribable(); },
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PostViewComponent],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: {} },
        { provide: HttpClientModule, useValue: fakeHTTPClient },
        { provide: OktaAuthService, useValue: fakeOktaAuth },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PostViewComponent);
    component = new PostViewComponent(
      TestBed.inject(ActivatedRoute),
      TestBed.inject(PostService),
      TestBed.inject(ProfileService)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.comments).toBeNull();
    expect(component.userEmail).toBe('');
  });

  it('should delete a post on deletePost()', () => {
    component.postService.delete = jasmine.createSpy().and.returnValue(new Subscribable());
    component.deletePost(testPost);
    expect(component.post).toBeNull();
    expect(component.postService.delete).toHaveBeenCalled();
  });

  it('should be editable on startEditPost()', () => {
    component.post = testPost;
    component.startEditPost();
    expect(component.isEditing).toBeTrue();
    expect(component.editContent).toEqual(testPost.content);
  });

  it('should stop editing on cancelEditPost()', () => {
    component.post = testPost;
    component.startEditPost();
    component.cancelEditPost();
    expect(component.isEditing).toBeFalse();
  });

  it('should send the edited post on endEditPost()', () => {
    let newPostContent = "New post content";
    component.postService.update = jasmine.createSpy().and.returnValue(new Subscribable());

    component.post = testPost;
    component.startEditPost();
    component.editContent = newPostContent;
    component.endEditPost();
    expect(component.postService.update).toHaveBeenCalledWith(component.post);
  });

  it('should set the post content on endEditPost()', () => {
    let newPostContent = "New post content";
    component.postService.update = jasmine.createSpy().and.returnValue(new Subscribable());
    
    component.post = testPost;
    component.startEditPost();
    component.editContent = newPostContent;
    component.endEditPost();
    expect(component.post.content).toEqual(newPostContent);
  });

  it('should stop editing on endEditPost()', () => {
    component.post = testPost;
    component.startEditPost();
    component.endEditPost();
    expect(component.isEditing).toBeFalse();
  });
});
