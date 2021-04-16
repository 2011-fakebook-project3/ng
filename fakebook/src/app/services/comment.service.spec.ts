import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../authentication/core/authentication/auth.service';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  const fakeAuthService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: AuthService, useValue: fakeAuthService }],
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
