import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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


  constructor() { }

  ngOnInit(): void {
    if(this.commentAndUserExist(this.comment)) {

      this.setFullName(this.comment);
      // Used to check for a profile picture of the user exists. As I have been informed, the backend will set a default value
      //    for the profile picture at the very least. Therefore user existing also means profile picture exists.
      this.setProfilePicture(this.comment)
    }
  }

  deleteComment(comment: Comment) {
    console.log(comment);
    if(comment && comment.id !== undefined) {
      //this.commentService.delete(comment);
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
    this.user.fullname = (comment?.user?.firstName + " " + comment?.user?.lastName) ;
  }
}
