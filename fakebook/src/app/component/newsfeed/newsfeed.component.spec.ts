import { ComponentFixture, TestBed, fakeAsync, waitForAsync, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { NEVER } from 'rxjs';

import { NewsfeedComponent } from './newsfeed.component';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { NewsfeedService } from 'src/app/service/newsfeed.service';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;

  const FakeNewsFeedService = {};

  const testposts: Post[] = [
    { id: 1, content: 'content 1', createdAt: new Date(), pictureUrl: '', email: 'irene@email.com', comments: [] },
    { id: 2, content: 'content 2', createdAt: new Date(), pictureUrl: '', email: 'moriarty@email.com', comments: [] }
  ];

  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@email.com',
    phoneNumber: '5551234567',
    profilePictureUrl: 'https://image.png',
    status: 'My Fake User status',
    birthDate: new Date()
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      providers: [
        { provide: NewsfeedService, useValue: FakeNewsFeedService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    fixture.detectChanges();

    component = new NewsfeedComponent(TestBed.inject(NewsfeedService));
    component.user = testUser;
    component.posts = testposts;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user information onInit', () => {
    const  user = component.getUser();
    expect(user).toBeTruthy();
  });

  it('should get a list of posts OnInit', () => {
    const posts = component.getPosts();
    expect(posts).toBeTruthy();
  });

  it('should set the user ', () => {
    component.getUser();
    expect(component.user).toBe(testUser);
  })

  it('should display name in a h3 header', () => {
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.innerHTML).toBe('first last');
  });

});
