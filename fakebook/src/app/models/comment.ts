import { User } from './user';

export interface Comment {
  id: number;
  userId: number;
  content: string;
  postId: number;
  createdAt: Date | undefined;
}
