import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { Comment } from 'src/app/model/comment';
import { Post } from '../../model/post';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  @Input() post: Post | null = null;
  @Input() userEmail = '';

  @Output() notifyComment: EventEmitter<string> = new EventEmitter<string>();

  user: User | null = null;
  comments: Comment[] | null = null;
  isEditing  = false;
  editContent  = "";

  readonly resourceCollection = "posts";

  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    public profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.post && this.post.userEmail) {
      this.getUser(this.post.userEmail);
    }
  }

  getUser(email: string): void {
    this.profileService
      .GetProfile(email)
      .subscribe((user) => (this.user = user));
  }

  // likePost(postId: number): void{
  //   this.postService.likePost(postId).subscribe();
  //   this.post?.likedByUserIds.push(postId);
  // }

  // unLikePost(postId: number): void {
  //   if (this.post && this.post.likedByUserIds && this.post?.likedByUserIds.indexOf(postId) !== -1){
  //     // this.post.likedByUserIds = this.post?.likedByUserIds.filter(element !== postId)
  //     this.postService.unLikePost(postId).subscribe();
  //   }
  // }

  startEditPost(): void
  {
    this.isEditing = true;
    if(this.post)
      this.editContent = this.post?.content;
  }

  endEditPost() : void
  {
    if(!this.post)
    {
      alert("Cannot edit a null post!");
      return;
    }

    this.post.content = this.editContent;
    this.postService.update(this.post).subscribe();
    this.isEditing = false;
  }

  cancelEditPost() : void
  {
    this.isEditing = false;
  }

  deletePost(post: Post): void {
    this.post = null;
    this.postService.delete(post.id);
  }

  deleteComment(comment: Comment): void {
    if (this.post) {
      // TODO: delete from backend

      const index = this.post.comments.indexOf(comment);
      delete this.post.comments[index];
    }
  }

  onNotifyComment(valueEmitted: any): void {
    this.notifyComment.emit(valueEmitted);
  }
}
