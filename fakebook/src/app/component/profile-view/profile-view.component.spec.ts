import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { FollowService } from 'src/app/service/follow.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';

import { ProfileViewComponent } from './profile-view.component';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;

  const fakeAuthService = {
    getUser(): void { }
  };
  const fakeProfileService = { };
  const fakeRoute = { };
  const fakeFollowService = { };
  const fakePostService = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      providers: [
        { provide: OktaAuthService, useValue: fakeAuthService },
        { provide: ProfileService, useValue: fakeProfileService},
        { provide: ActivatedRoute, useValue: fakeRoute },
        { provide: FollowService, useValue: fakeFollowService },
        { provide: PostService, useValue: fakePostService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
