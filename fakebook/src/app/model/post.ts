export interface Post {
  id: number;
  content: string;
  userId: number;
  pictureUrl: string | undefined;
  createdAt: Date;
  likedByUserIds: number[];
  commentIds: number[];
  liked: boolean | false;
}