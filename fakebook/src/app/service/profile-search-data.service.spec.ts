import { TestBed } from '@angular/core/testing';

import { ProfileSearchDataService } from './profile-search-data.service';

describe('ProfileSearchDataService', () => {
  let service: ProfileSearchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSearchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
