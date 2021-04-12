import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UploadService } from 'src/app/service/upload.service';
import { NewPost } from '../../model/newpost';
import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  const user: User = {
    id: 0,
    firstName: 'test',
    lastName: 'test',
    email: 't@test.com',
    phoneNumber: '',
    profilePictureUrl: '',
    status: '',
    birthDate: new Date(),
    followers: [],
    following: [],
  };

  beforeEach(async () => {
    const mockUploadService = {};
    const mockPostService = {};
    const mockProfileService = {
      GetProfileWithNullRoute(): Observable<User> {
        return of(user);
      },
    };
    const newPostObject: NewPost = { content: '', userId: '', pictureUrl: '' };
    const FakeOktaAuthService = {
      create(post: NewPost): Promise<NewPost> {
        return Promise.resolve(newPostObject);
      },
      getAccessToken(): string {
        return '1';
      },
    };
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      providers: [
        { provide: UploadService, useValue: mockUploadService },
        { provide: PostService, useValue: mockPostService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: HttpClient, useValue: {} },
        { provide: OktaAuthService, useValue: FakeOktaAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.newPost.content).toBe('');
    expect(component.newPost.userId).toBe('');
    expect(component.newPost.pictureUrl).toBe('');
    expect(component.submitted).toBeFalse();
    expect(component.file).toBeNull();
    expect(component.imageSource).toBe('');
  });

  it('should match between user id and getUserId function', () => {
    component = new PostFormComponent(
      TestBed.inject(UploadService),
      TestBed.inject(PostService),
      TestBed.inject(ProfileService)
    );
    component.getUser();
    const testUserId = component.getUserId();
    expect(testUserId).toBe(component.user?.id);
  });

  it('should set this user in getUser()', () => {
    component = new PostFormComponent(
      TestBed.inject(UploadService),
      TestBed.inject(PostService),
      TestBed.inject(ProfileService)
    );
    component.getUser();
    expect(component.user).toBe(user);
  });
});
