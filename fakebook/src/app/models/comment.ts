
export interface Comment {
  id: number;
  content: string;
  postId: number;
  createdAt: Date | undefined;
}
