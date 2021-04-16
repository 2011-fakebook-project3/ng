import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { ProfileViewComponent } from './profile-view.component';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/services/profile.service';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  const userTest: User = {
    id: 10,
    firstName: 'Adam',
    lastName: 'Driver',
    email: 'Adriver@test.com',
    phoneNumber: '1',
    profilePictureUrl: '1',
    status: '1',
    birthDate: new Date(),
    followers: [],
    following: [],
  };
  const posts: Post[] = [];

  beforeEach(async () => {
    const FakeAuthService = {
      getAccessToken(): string {
        return '1';
      },
      getUser(): void {},
    };

    const mockProfileService = {
      GetProfile(id: string): Observable<User> {
        return of(userTest);
      },
    };

    const fakeFollowService = {
      getFollowStatus(follower: User, followee: User): boolean {
        return true;
      },
    };

    const fakePostService = {
      getPosts(): void {},
      getUserPosts(): Observable<Post[]> {
        return of(posts);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ProfileViewComponent],
      providers: [
        { provide: AuthService, useValue: FakeAuthService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ email: 'Adriver@test.com' }),
            },
          },
        },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: FollowService, useValue: fakeFollowService },
        { provide: PostService, useValue: fakePostService },
      ],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.user).toBeUndefined();
  });

  it('should get a user and store in the user field', () => {
    component = new ProfileViewComponent(
      TestBed.inject(AuthService),
      TestBed.inject(ProfileService),
      TestBed.inject(ActivatedRoute),
      TestBed.inject(FollowService),
      TestBed.inject(PostService)
    );
    component.getUser();
    expect('Adriver@test.com').toBe(userTest.email);
  });
});
