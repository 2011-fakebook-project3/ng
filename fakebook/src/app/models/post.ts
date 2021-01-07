import { Comment } from './comment';


export interface Post {
  id: number;
  email: string;
  content: string;
  pictureUrl: string | undefined;
  createdAt: Date | undefined;
  comments: Comment[] | undefined;
}
