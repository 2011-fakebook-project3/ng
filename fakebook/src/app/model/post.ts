import { Comment } from '@angular/compiler';

export interface Post {
  id: number;
  content: string;
  userId: number;
  pictureUrl: string | undefined;
  createdAt: Date;
  likedByUserIds: number[];
  comments: Comment[];
  liked: boolean | false;
}
