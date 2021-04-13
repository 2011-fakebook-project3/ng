import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NEVER, Observable, of } from 'rxjs';

import { NewsfeedComponent } from './newsfeed.component';
import { User } from '../../model/user';
import { Post } from '../../model/post';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { PostService } from 'src/app/services/post.service';

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
      likedByUserIds: [],
      comments: [],
      liked: false,
    },
    {
      id: 2,
      content: 'content 2',
      userEmail: 'e@mail',
      createdAt: new Date(),
      pictureUrl: '',
      likedByUserIds: [],
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
    followees: [],
  };

  beforeEach(async () => {
    const FakeNewsFeedService = {
      getUser(): any {
        return of(testUser);
      },
      getPosts(): Observable<Post[]> {
        return of(testposts);
      },
    };

    const mockPostService = {
      delete(id: number): void {},
    };

    await TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      providers: [
        { provide: NewsfeedService, useValue: FakeNewsFeedService },
        { provide: PostService, useValue: mockPostService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
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
