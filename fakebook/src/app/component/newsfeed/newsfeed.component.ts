import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Post } from '../../model/post';
import { NewsfeedService } from '../../services/newsfeed.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  posts: Post[] = [];
  user: User | null = null;

  constructor(
    private newsfeedService: NewsfeedService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
  }

  getPosts(): void {
    this.newsfeedService
      .getPosts()
      .subscribe((gotPosts) => (this.posts = gotPosts));
  }

  getUser(): void {
    this.newsfeedService
      .getUser()
      .subscribe((gotUser) => (this.user = gotUser));
  }

  onNotifyComment(valueEmitted: any): any {
    console.log(valueEmitted);
    this.postService.getById(valueEmitted).subscribe((res) => {
      const index = this.posts.findIndex((post) => post.id === res.id);
      this.posts[index] = res;
    });
  }
}
