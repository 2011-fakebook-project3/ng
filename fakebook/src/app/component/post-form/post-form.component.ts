import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { User } from 'src/app/model/user';
import { ProfileService } from '../../services/profile.service';
import { NewPost } from '../../model/newpost';
import { PostService } from '../../services/post.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-new-post-form',
  providers: [PostService, ProfileService],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {
  submitted = false;
  file: File | null = null;
  imageSource = '';
  newPost = new NewPost('', '', ''); // we'll initialize user id at onsubmit

  @ViewChild('fileInput') fileInputRef!: ElementRef;

  @Input() user: User | null = null;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private uploadService: UploadService,
    private httpPost: PostService,
    private profileService: ProfileService
  ) {}

  onSubmit(): any {
    if (this.file) {
      const content = this.newPost.content;
      const promise = this.save();
      if (promise) {
        promise.then((res) => {
          this.newPost.content = content;
          this.newPost.pictureUrl = res.path;
          this.newPost.userId = this.user?.email;
          this.submitted = true;
          this.httpPost.create(this.newPost).then((result) => {
            return this.notify.emit('test value from child');
          });

          this.newPost.content = '';
          this.newPost.pictureUrl = '';
          this.fileInputRef.nativeElement.value = null;
          this.file = null;
        });
      }
    } else {
      console.log(this.newPost);
      this.newPost.userId = this.user?.email;
      this.submitted = true;
      this.httpPost
        .create(this.newPost)
        .then((res) => this.notify.emit('test value from child'));
    }
  }

  getUser(): void {
    this.profileService
      .GetProfileWithNullRoute() // gets the user
      .subscribe((gotuser: User | null) => (this.user = gotuser));
  }

  getUserId(): number | undefined {
    return this.user?.id;
  }

  save(): Promise<{ path: string; userId: number }> | null {
    if (this.file && this.user) {
      const formData = new FormData();

      formData.append(this.file.name, this.file);
      formData.append('userId', `${this.user.id}`);
      return this.uploadService.upload(formData);
    }

    return null;
  }

  fileSelect(event: any): void {
    if (event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }
}
