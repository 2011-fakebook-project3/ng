import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Post } from '../../models/post';
import { NewsfeedService } from '../../service/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  posts: Post[] = [];
  user: User | null = null;

  constructor(
    private newsfeedService: NewsfeedService
  ) { }

  ngOnInit(): void {

      this.getPosts();
      this.getUser();
      console.log(this.user);
      console.log(this.posts);
  }

  getPosts(): void {
    this.newsfeedService.getPosts()
      .subscribe((gotPosts) => this.posts = gotPosts);
  }

  getUser(): void {
    this.newsfeedService.getUser()
      .subscribe((gotUser) => this.user = gotUser);

  }

}
