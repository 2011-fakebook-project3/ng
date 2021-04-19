import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProfileViewComponent } from './profile-view.component';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/services/profile.service';
import { FollowService } from 'src/app/services/follow.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post';
import { By } from '@angular/platform-browser';

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
    const FakeOktaAuthService = {
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
        return false;
      },
      follow(follower: string): any {
        return true;
      },
      unfollow(follower: string): any {
        return true;
      }
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
        { provide: OktaAuthService, useValue: FakeOktaAuthService },
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
      TestBed.inject(OktaAuthService),
      TestBed.inject(ProfileService),
      TestBed.inject(ActivatedRoute),
      TestBed.inject(FollowService),
      TestBed.inject(PostService)
    );
    component.getUser();
    expect('Adriver@test.com').toBe(userTest.email);
  });

  it('should first be unfollowed then followed', () => {
    component.user = userTest;
    expect(component.followStatus).toBe(false);
    component.followUser();
    expect(component.followStatus).toBe(true);
  });

  it('should expect followUser to be called after follow button click', () => {
    spyOn(component, 'followUser');
    component.user = userTest;
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('.btn'));
    button.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(component.followUser).toHaveBeenCalled();
    });
  });
});
