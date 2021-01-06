import { User } from './user';

export interface Comment {
  id: number;
  content: string;
  postId: number;
  createdAt: Date | undefined;
  user: User | undefined;
}
