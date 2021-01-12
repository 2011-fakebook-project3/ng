export type LikeNotification = {
    id: string,
    userId: string,
    date: Date,
    postId: number,
    type: 'like'
};

export type PostNotification = {
    id: string,
    userId: string,
    date: Date,
    postId: number,
    type: 'post'
};

export type FollowNotification = {
    id: string,
    userId: string,
    date: Date,
    type: 'follow'
};

export type CommentNotification = {
    id: string,
    userId: string,
    date: Date,
    postId: number,
    type: 'comment'
};

export type Notification =
    | LikeNotification
    | PostNotification
    | FollowNotification
    | CommentNotification;
