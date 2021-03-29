export type PostType = {
  key: 'like' | 'post' | 'follow' | 'comment';
  value: number;
};

export type ApiNotification = {
  id: string;
  type: PostType;
  loggedInUserId: string;
  triggerUserId: string;
  hasBeenread: boolean;
  date: Date;
};
