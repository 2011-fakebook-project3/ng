import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-like-view[resourceCollection]',
  templateUrl: './like-view.component.html',
  styleUrls: ['./like-view.component.css'],
})
export class LikeViewComponent {
  @Input() count?: number;
  @Input() postId?: number;
  @Input() liked?: boolean;
  @Input() resourceCollection = "";

  constructor(private likeService: LikeService) {}

  submit(): void {
    if ((this.count !== undefined) && this.postId) {
      // if the resource is aready liked we should unlike it
      if (this.liked) {
        this.likeService.unlike(this.postId, this.resourceCollection);
        this.liked = !this.liked;
        this.count--;
      } else {
        // like the resource
        this.likeService.like(this.postId, this.resourceCollection);
        this.liked = !this.liked;
        this.count++;
      }
    }
  }
}
