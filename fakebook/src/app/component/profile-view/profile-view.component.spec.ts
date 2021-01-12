import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProfileViewComponent } from './profile-view.component';
import { ActivatedRoute, convertToParamMap, RouterModule } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/service/profile.service';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  const userTest: User = { id: 10,
    firstName: 'Adam',
    lastName: 'Driver',
    email: 'Adriver@test.com',
    phoneNumber: '1',
    profilePictureUrl: '1',
    status: '1',
    birthDate: new Date()
  };

  beforeEach(async () => {
    const FakeOktaAuthService  = {
      getAccessToken(): string {return '1'; }
    };
    const mockProfileService = {
      GetProfile(id: string): Observable<User>{
        return of(userTest);
      }
    };
    await TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      providers: [
        { provide: OktaAuthService, useValue: FakeOktaAuthService},
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 'Adriver@test.com'})}}},
        { provide: ProfileService, useValue: mockProfileService}
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule
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
    expect(component.user).toBeNull();
  });

  it('should get a user and store in the user field', () => {
    component = new ProfileViewComponent(TestBed.inject(ActivatedRoute), TestBed.inject(ProfileService));
    component.getUser();
    expect(component.user?.email).toBe(userTest.email);
  });
});
