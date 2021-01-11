export type LikeNotification = {
    userId: string,
    date: Date,
    postId: number,
    type: 'like'
};

export type PostNotification = {
    userId: string,
    date: Date,
    postId: number,
    type: 'post'
};

export type FollowNotification = {
    userId: string,
    date: Date,
    type: 'follow'
};

export type CommentNotification = {
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
