import { Comment } from './comment';

export interface Post {
  id: number;
  content: string;
  userEmail: string;
  pictureUrl: string | undefined;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
}
