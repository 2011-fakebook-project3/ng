import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
    private newsfeedService: NewsfeedService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if(params['id'] != undefined){   
        this.postId = +params['id'];
          if(this.postId != undefined)
            this.getPostById();
      }
      else{
        this.getPosts();
      }
    })
  }

  ngOnInit(): void {
    this.getUser();
  }

  getPosts(): void {
    this.newsfeedService
      .getPosts()
      .subscribe((gotPosts) => (this.posts = gotPosts));
  }

  getPostById(): void {
    this.newsfeedService
      .getPostById(this.postId!)
      .subscribe(p => this.posts = [p]);
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
