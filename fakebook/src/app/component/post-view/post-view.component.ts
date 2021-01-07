import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/model/user';
import { PostService } from 'src/app/service/post.service';
import { Comment } from 'src/app/model/comment';
import { Post } from '../../model/post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  @Input() post: Post | null = null;
  @Input() userid = 0;

  @Output() notifyComment: EventEmitter<string> = new EventEmitter<string>();

  user: User | null = null;
  comments: Comment[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    if (this.userid !== 0) {
      this.getUser(this.userid);
    }
    if (this.post) {
      this.getPostComments(this.post.id);
    }
  }

  getUser(id: number): void{
    // TODO: get user from which service?
    throw Error('not implemented');
  }

  getPostComments(id: number): void{
    // TODO: subscribe to postService to get list of comments in this post
    throw Error('not implemented');
  }

  deletePost(post: Post): void{
    this.post = null;
    this.postService.delete(post.id);
  }
}
