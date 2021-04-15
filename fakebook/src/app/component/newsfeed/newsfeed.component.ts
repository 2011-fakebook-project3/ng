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
  postId: number;

  constructor(
    private newsfeedService: NewsfeedService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if(params['id'] != undefined){   
        this.postId = +params['id'];
          if(this.postId != undefined)
            this.getPostsById();
      }
      else{
        this.getPosts();
      }
    })
  }

  ngOnInit(): void {
    this.getUser();
    //this.getPosts();
  }

  getPosts(): void {
    this.newsfeedService
      .getPosts(this.postId)
      .subscribe((gotPosts) => (this.posts = gotPosts));
  }

  getPostsById(): void {
    this.newsfeedService
      .getPostById(this.postId)
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
