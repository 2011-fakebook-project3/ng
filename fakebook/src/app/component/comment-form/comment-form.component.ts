import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';
import { CommentFormData } from 'src/app/model/comment-form-data';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() postId!: number;
  @Input() parentCommentId!: number;

  comment: CommentFormData = {
    content: '',
    postId: -1,
    parentCommentId: undefined,
  };

  @Output() notifyComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.setPostID(this.postId);
  }

  setPostID(id: number): void {
    this.comment.postId = id;
  }

  postComment(comment: CommentFormData): void {
    this.commentService
      .create({
        id: 0,
        content: comment.content,
        postId: comment.postId,
        createdAt: undefined,
        userEmail: this.auth.email,
      })
      .then((res) => this.notifyComment.emit(this.postId));

    this.notificationsService.createCommentNotification(
      this.auth.email,
      comment.postId
    );

    this.comment.content = '';
  }
}
