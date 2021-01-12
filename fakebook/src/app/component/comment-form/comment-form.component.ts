import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { CommentFormData } from 'src/app/model/comment-form-data';
import { CommentService } from 'src/app/service/comment.service';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() postId!: number;
  @Input() parentCommentId!: number;
  email = '';

  comment: CommentFormData = { content: '', postId: -1, parentCommentId: undefined };

  @Output() notifyComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private oktaAuth: OktaAuthService
  ) { }

  ngOnInit(): void {
    this.setPostID(this.postId);
    this.getUserEmail();
  }

  getUserEmail(): void {
    this.oktaAuth.getUser().then(user => {
      this.email = user.email ??  '';
    });
  }

  setPostID(id: number): void {
    this.comment.postId = id;
  }

  postComment(comment: CommentFormData): void {

    this.commentService.create({
      id: 0,
      content: comment.content,
      postId: comment.postId,
      createdAt: undefined,
      userEmail: this.email
    }).then(res => this.notifyComment.emit(this.postId));

    this.comment.content = '';
  }
}
