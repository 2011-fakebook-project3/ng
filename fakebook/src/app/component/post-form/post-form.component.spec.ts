import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/service/post.service';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    const mockUploadService = {};
    const mockPostService = {};
    const mockUserService = {};
    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      providers: [
        { provide: UploadService, useValue: mockUploadService },
        { provide: PostService, useValue: mockPostService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component = new PostFormComponent(TestBed.inject(UploadService), TestBed.inject(PostService), TestBed.inject(UserService));
    expect(component).toBeTruthy();
  });
});
