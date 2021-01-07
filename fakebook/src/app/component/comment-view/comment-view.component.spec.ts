import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentViewComponent } from './comment-view.component';
import { CommentService } from "src/app/comment.service";

describe('CommentViewComponent', () => {
  let component: CommentViewComponent;
  let fixture: ComponentFixture<CommentViewComponent>;
  let commentDeleteSpy: any;

  const FakeCommentService = {
    delete(): void { }
  }

  const fakeUser = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@email.com',
    phoneNumber: '5551234567',
    profilePictureUrl: 'https://image.png',
    status: 'My Fake User status',
    birthDate: new Date()
  };

  const fakeComment = {
    id: 1,
    content: 'my fake comment',
    postId: 1,
    createdAt: new Date(),
    user: fakeUser
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentViewComponent ],
      providers: [
        { provide:  CommentService, useValue: FakeCommentService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentViewComponent);
    fixture.detectChanges();

    component = new CommentViewComponent(TestBed.inject(CommentService));
    component.comment = fakeComment;
    commentDeleteSpy = spyOn(FakeCommentService, 'delete')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if comment and user exist', () => {
    var tf = component.commentAndUserExist(component.comment);

    expect(tf).toBeTrue();
  });

  it('should check if comment and user DO NOT exist', () => {
    var tf = component.commentAndUserExist(null);

    expect(tf).toBeFalse();
  });

  it('should set the profile picture', () => {
    component.setProfilePicture(component.comment);

    expect(component.user.profilePictureUrl).toBe('https://image.png');
  });

  it('should set the full name', () => {
    // maybe this one and maybe the profile profile picture one i could test whether it gets set in the first place, 
    //    and then check if the element gets set to it.
    component.setFullName(component.comment);

    expect(component.user.fullname).toBe('first last');

    

  });

  // it('should delete comments', () => {
    
  // });
});
