import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { of } from 'rxjs';
import { Comment } from 'src/app/model/comment';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  const fakeCommentService = {
    create(comment: Comment): void { }
  };
  const fakeAuthService = {
    getUser(): void { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentFormComponent ],
      providers: [
        { provide: CommentService, useValue: fakeCommentService },
        { provide: ActivatedRoute, useValue: {
          paramMap: of( convertToParamMap( { userId: 1 } ) ) } },
        { provide: OktaAuthService, useValue: fakeAuthService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    fixture.detectChanges();

    const fakeCommentServ = TestBed.inject(CommentService);
    const fakeAuthServiceTwo = TestBed.inject(OktaAuthService);
    component = new CommentFormComponent(fakeCommentServ, TestBed.inject(ActivatedRoute), fakeAuthServiceTwo);
  });
});
