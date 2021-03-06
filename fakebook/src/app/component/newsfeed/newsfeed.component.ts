import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  postId: number | undefined;

  constructor(
    private readonly newsfeedService: NewsfeedService,
    private readonly postService: PostService,
    private readonly route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let loadUserFeed = params['id'] === undefined;
      this.getPosts(loadUserFeed);
      if(!loadUserFeed) {
        this.postId = +params['id'];
        if(this.postId !== undefined && !isNaN(this.postId)) {
          this.getPostById();
        }
      } 
    });
  }

  getPosts(loadUserFeed : boolean): void {
    this.newsfeedService
      .getUser()
      .subscribe((gotUser) => { 
        this.user = gotUser;
        if(loadUserFeed)
         {
          this.newsfeedService.getPosts(gotUser?.following)
            .subscribe((gotPosts) => (this.posts = gotPosts));
        }
      });
  }

  getPostById(): void {
    if (this.postId !== undefined && !isNaN(this.postId)) {
      this.newsfeedService
      .getPostById(this.postId)
      .subscribe((p) => this.posts = [p]);
    }
  }

  onNotifyComment(valueEmitted: any): any {
    console.log(valueEmitted);
    this.postService.getById(valueEmitted).subscribe((res) => {
      const index = this.posts.findIndex((post) => post.id === res.id);
      this.posts[index] = res;
    });
  }
}
