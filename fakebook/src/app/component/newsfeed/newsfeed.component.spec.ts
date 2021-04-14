import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NEVER, Observable, of, from } from 'rxjs';

import { NewsfeedComponent } from './newsfeed.component';
import { User } from '../../model/user';
import { Post } from '../../model/post';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MockActivatedRoute } from '../../../mock/MockActivatedRoute';
import { Mock } from 'protractor/built/driverProviders';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;

  const testposts: Post[] = [
    {
      id: 1,
      content: 'content 1',
      userEmail: 'e@mail',
      createdAt: new Date(),
      pictureUrl: '',
      likes: [],
      comments: [],
      liked: false,
    },
    {
      id: 2,
      content: 'content 2',
      userEmail: 'e@mail',
      createdAt: new Date(),
      pictureUrl: '',
      likes: [],
      comments: [],
      liked: false,
    },
  ];

  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@email.com',
    phoneNumber: '5551234567',
    profilePictureUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.JIWU3L8WkMo9Yv1VtNnErQHaEK%26pid%3DApi&f=1',
    status: 'My Fake User status',
    birthDate: new Date(),
    followers: [],
    following: [],
  };

  beforeEach(async () => {
    const FakeNewsFeedService = {
      getUser(): any {
        return of(testUser);
      },
      getPosts(): Observable<Post[]> {
        return of(testposts);
      },
      getPostById(postId: number): Observable<Post> {
        return of(testposts[0]);
      }
    };

    const mockPostService = {
      delete(id: number): void {},
    };

    const mockActivatedRoute = new MockActivatedRoute();
    mockActivatedRoute.testParams = {};

    await TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      providers: [
        { provide: NewsfeedService, useValue: FakeNewsFeedService },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    component.posts = testposts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user information onInit', () => {
    expect(component.user).toBe(testUser);
  });

  it('should get a list of posts OnInit', () => {
    expect(component.posts).toBe(testposts);
  });

  it('should get all posts', () => {
    expect(component.posts.length).toBe(2);
  });

  it('should display name in a h3 header', () => {
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.innerHTML).toBe('first last');
  });
});

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;

  const testposts: Post[] = [
    {
      id: 1,
      content: 'content 1',
      userEmail: 'e@mail',
      createdAt: new Date(),
      pictureUrl: '',
      likes: [],
      comments: [],
      liked: false,
    },
    {
      id: 2,
      content: 'content 2',
      userEmail: 'e@mail',
      createdAt: new Date(),
      pictureUrl: '',
      likes: [],
      comments: [],
      liked: false,
    },
  ];

  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@email.com',
    phoneNumber: '5551234567',
    profilePictureUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.JIWU3L8WkMo9Yv1VtNnErQHaEK%26pid%3DApi&f=1',
    status: 'My Fake User status',
    birthDate: new Date(),
    followers: [],
    following: [],
  };

  beforeEach(async () => {
    const FakeNewsFeedService = {
      getUser(): any {
        return of(testUser);
      },
      getPosts(): Observable<Post[]> {
        return of(testposts);
      },
      getPostById(postId: number): Observable<Post> {
        return of(testposts[0]);
      }
    };

    const mockPostService = {
      delete(id: number): void {},
    };

    const mockActivatedRoute = new MockActivatedRoute();
    mockActivatedRoute.testParams = { id: 1 };

    await TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      providers: [
        { provide: NewsfeedService, useValue: FakeNewsFeedService },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    component.posts = testposts;
    fixture.detectChanges();
  });

  it('_should get a single post OnInit', () => {
    expect(component.posts).toEqual(testposts.slice(0,1));
  });

  it('_should get a post', () => {
    expect(component.posts.length).toBe(1);
  });
  });

