import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Post } from '../../models/post';
import { NewsfeedService } from '../../services/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

   posts : Post[] = [];
   user: User;

   testposts:Post[] =[
    { id: 1, content: 'content 1', createdAt: new Date(), pictureUrl: '', email: 'irene@email.com', comments: [] },
    { id: 2, content: 'content 2', createdAt: new Date(), pictureUrl: '', email: 'moriarty@email.com', comments: [] }
   ]

  constructor(
    private newsfeedService: NewsfeedService
  ) { }

  ngOnInit(): void {
    console.log(this.posts);
    this.getPosts();
    this.getUser();
    console.log(this.posts);
    console.log(this.user);
  }

  getPosts(){
    this.newsfeedService.getPosts()
    .subscribe((gotPosts) => this.posts = gotPosts);
  }

  getUser(){
    this.newsfeedService.getUser()
    .subscribe((gotUser) => this.user = gotUser);
  }
}
