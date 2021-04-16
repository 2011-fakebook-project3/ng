import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeService } from 'src/app/services/like.service';
import { LikeViewComponent } from './like-view.component';
import { NewPost } from '../../model/newpost';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';

describe('LikeViewComponent', () => {
  let component: LikeViewComponent;
  let fixture: ComponentFixture<LikeViewComponent>;
  const newPost: NewPost = { content: '', userId: '', pictureUrl: '' }; // probably have to change for real testing
  const FakeAuthService = {
  };
  const FakeLikeService = {
    like(postId: number): any {
      return 1;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeViewComponent],
      providers: [
        { provide: LikeService, useValue: FakeLikeService },
        { provide: AuthService, useValue: FakeAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
