import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { CommentService } from 'src/app/services/comment.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css'],
})
export class CommentViewComponent implements OnInit {
  user = {
    profilePictureUrl: '',
    fullname: '',
  };

  @Input() comment: Comment | null = null;
  @Input() currentUserEmail!: string;

  @Output() delete = new EventEmitter<Comment>();

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.commentAndUserExist(this.comment)) {
      this.profileService.GetProfile(this.comment?.userEmail ?? '').subscribe(
        (prof) => {
          this.user.profilePictureUrl = prof.profilePictureUrl ?? '';
          this.user.fullname = prof.firstName + ' ' + prof.lastName;
        }
      );
    }
  }

  deleteComment(comment: Comment): void {
    console.log(comment);
    if (comment && comment.id !== undefined) {
      this.commentService.delete(comment);
      this.delete.emit(comment);
    }
  }

  commentAndUserExist(comment: Comment | null): boolean {
    if (comment && comment.userEmail) {
      return true;
    }
    return false;
  }
}
