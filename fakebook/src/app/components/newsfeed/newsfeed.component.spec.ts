import { ComponentFixture, TestBed,  fakeAsync, waitForAsync, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationBehaviorOptions , Router } from '@angular/router';
import { NEVER } from 'rxjs';

import { NewsfeedComponent } from './newsfeed.component';
import { User} from '../../models/user';
import { Post } from '../../models/post';
import { Comment} from '../../models/comment';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;


  const    testposts: Post[] = [
    { id: 1, content: 'content 1', createdAt: new Date(), pictureUrl: '', email: 'irene@email.com', comments: [] },
    { id: 2, content: 'content 2', createdAt: new Date(), pictureUrl: '', email: 'moriarty@email.com', comments: [] }
   ];

  const testUser: User = {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'e@mail',
    phoneNumber: undefined,
    profilePictureUrl: undefined,
    status: undefined,
    birthDate: new Date(2010, 12)
   };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsfeedComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of posts of followers if they exists', () => {
    const showPosts = fixture.debugElement.query(By.css('.post')).nativeElement;
    expect(showPosts.tagName).toBe('div');
    expect(showPosts.attribute).toContain('*ngFor');
  });
});
