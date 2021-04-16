import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { Post } from '../model/post';
import { PostService } from './post.service';
import { AuthService } from '../authentication/core/authentication/auth.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockAuthService = {
    get authorizationHeaderValue(): string {
      return "Bearer 0";
    }
  };

  const mockPostService = {
    getById(id: number): Observable<Post> {
      return new Observable<Post>();
    },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: PostService, useValue: mockPostService },
      ],
    }).compileComponents();

    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
