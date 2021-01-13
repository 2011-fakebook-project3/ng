import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/service/like.service';

@Component({
  selector: 'app-like-view',
  templateUrl: './like-view.component.html',
  styleUrls: ['./like-view.component.css']
})
export class LikeViewComponent implements OnInit {
  @Input() count!: number;
  @Input() postId!: number;
  @Input() liked!: boolean;

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
  }

  submit(): void {
    // if the post is aready liked we should unlike it
    if (this.liked) {
      this.likeService.unlike(this.postId);
      this.liked = !this.liked;
      this.count --;
    } else {
      // like the post
      this.likeService.like(this.postId);
      this.liked = !this.liked;
      this.count ++;
    }
  }
}
