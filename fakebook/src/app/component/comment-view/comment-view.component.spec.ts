import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentService } from 'src/app/services/comment.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentViewComponent } from './comment-view.component';

describe('CommentViewComponent', () => {
  let component: CommentViewComponent;
  let fixture: ComponentFixture<CommentViewComponent>;

  const FakeCommentService = {};
  const FakeProfileService = {};

  const fakeUser = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@email.com',
    phoneNumber: '5551234567',
    profilePictureUrl: 'https://image.png',
    status: 'My Fake User status',
    birthDate: new Date(),
  };

  const fakeComment = {
    id: 1,
    content: 'my fake comment',
    postId: 1,
    createdAt: new Date(),
    childCommentIds: [5, 3],
    userEmail: fakeUser.email,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentViewComponent],
      providers: [
        { provide: CommentService, useValue: FakeCommentService },
        { provide: ProfileService, useValue: FakeProfileService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentViewComponent);
    fixture.detectChanges();

    component = new CommentViewComponent(
      TestBed.inject(CommentService),
      TestBed.inject(ProfileService)
    );
    component.comment = fakeComment;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if comment and user exist', () => {
    const tf = component.commentAndUserExist(component.comment);

    expect(tf).toBeTrue();
  });

  it('should check if comment and user DO NOT exist', () => {
    const tf = component.commentAndUserExist(null);

    expect(tf).toBeFalse();
  });
});
