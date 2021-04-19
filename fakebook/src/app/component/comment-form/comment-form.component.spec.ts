import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';
import { Comment } from 'src/app/model/comment';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationsService } from 'src/app/services/notifications.service';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  const fakeCommentService = {
    create(comment: Comment): void {},
  };
  const fakeAuthService = {
    getUser(): void {},
  };

  const fakeNotifService = {
    createCommentNotification(): void {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      providers: [
        { provide: CommentService, useValue: fakeCommentService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ userId: 1 })),
          },
        },
        { provide: AuthService, useValue: fakeAuthService },
        { provide: NotificationsService, useValue: fakeNotifService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    fixture.detectChanges();

    const fakeCommentServ = TestBed.inject(CommentService);
    const fakeAuthServiceTwo = TestBed.inject(AuthService);
    component = new CommentFormComponent(
      TestBed.inject(CommentService),
      TestBed.inject(ActivatedRoute),
      TestBed.inject(AuthService),
      TestBed.inject(NotificationsService)
    );
  });
});
