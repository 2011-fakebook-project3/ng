import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    const mockHttpClient = {};
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: HttpClient, useValue: mockHttpClient}
      ]

    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have getUser function', () => {
    service = new UserService(TestBed.inject(HttpClient));
    expect(service.getUser).toBeTruthy();
   });
});
