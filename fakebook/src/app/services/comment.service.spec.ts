import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  const fakeAuthService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: OktaAuthService, useValue: fakeAuthService }],
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
