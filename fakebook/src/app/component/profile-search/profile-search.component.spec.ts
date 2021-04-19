import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchComponent } from './profile-search.component';
import { ProfileService } from 'src/app/service/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';

describe('ProfileSearchComponent', () => {
  let component: ProfileSearchComponent;
  let fixture: ComponentFixture<ProfileSearchComponent>;

  const fakeHTTPClient = {};
  const fakeOktaAuth = { getAccessToken(): void {} };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ProfileSearchComponent ],
      providers: [
        { provide: HttpClientModule, useValue: fakeHTTPClient },
        { provide: OktaAuthService, useValue: fakeOktaAuth },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSearchComponent);
    component = new ProfileSearchComponent(
      TestBed.inject(ProfileService)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
