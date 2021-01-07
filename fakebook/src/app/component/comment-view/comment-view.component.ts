import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/comment.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent implements OnInit {

  user = {
    profilePictureUrl: '',
    fullname: ''
  };

  @Input() comment: Comment | null = null;
  @Input() currentUserId!: number;

  @Output() delete = new EventEmitter<Comment>();


  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    if (this.commentAndUserExist(this.comment)) {
      this.setFullName(this.comment);
      this.setProfilePicture(this.comment);
    }
  }

  deleteComment(comment: Comment) {
    console.log(comment);
    if (comment && comment.id !== undefined) {
      this.commentService.delete(comment);
      this.delete.emit(comment);
    }
  }

  commentAndUserExist(comment: Comment | null): boolean {
    if (comment && comment.user) {
      return true;
    }
    return false;
  }

  setProfilePicture(comment: Comment | null): void {
    this.user.profilePictureUrl = comment?.user?.profilePictureUrl as string;
  }

  setFullName(comment: Comment | null): void {
    this.user.fullname = (comment?.user?.firstName + ' ' + comment?.user?.lastName);
  }
}
