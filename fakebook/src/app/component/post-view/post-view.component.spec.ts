import { PostViewComponent } from './post-view.component';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  ActivatedRoute,
} from '@angular/router';

import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';

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
    followees: [],
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
    likedByUserIds: [],
    comments: [],
    liked: false,
  };

  const fakeHTTPClient = {};
  const fakeAuth = { getAccessToken(): void {} };
  beforeEach(async () => {
    const mockPostService = {
      delete(id: number): void {},
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PostViewComponent],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: {} },
        { provide: HttpClientModule, useValue: fakeHTTPClient },
        { provide: AuthService, useValue: fakeAuth },
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
    spyOn(component.postService, 'delete');
    component.deletePost(testPost);
    expect(component.post).toBeNull();
    expect(component.postService.delete).toHaveBeenCalled();
  });
});
