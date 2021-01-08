
export interface Comment {
  id: number;
  firstName: string;
  lastName: string;
  content: string;
  postId: number;
  createdAt: Date | undefined;
}
