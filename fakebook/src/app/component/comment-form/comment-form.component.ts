import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentFormData } from 'src/app/model/comment-form-data';
import { CommentService } from 'src/app/service/comment.service';
import { NotificationsService } from 'src/app/service/notifications.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() postId!: number;
  @Input() parentCommentId!: number;
  email = '';

  comment: CommentFormData = {
    content: '',
    postId: -1,
    parentCommentId: undefined,
  };

  @Output() notifyComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
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
        content: comment.content,
        postId: comment.postId,
      })
      .then((res) => this.notifyComment.emit(this.postId));

    this.notificationsService.createCommentNotification(
      this.email,
      comment.postId
    );

    this.comment.content = '';
  }
}
