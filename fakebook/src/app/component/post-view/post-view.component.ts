import { Component, OnInit } from '@angular/core';

import { Post } from '../../model/post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  constructor() {
    throw Error('not implemented');
  }

  ngOnInit(): void {
    throw Error('not implemented');
  }

  getUserId(): number {
    throw Error('not implemented');
  }

  deletePost(post: Post): void{
    throw Error('not implemented');
  }
}
