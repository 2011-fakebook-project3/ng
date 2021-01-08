export type LikeNotification = {
    userId: number,
    date: Date,
    type: 'Like'
};

export type PostNotification = {
    userId: number,
    date: Date,
    type: 'Post'
};

export type FollowNotification = {
    userId: number,
    date: Date,
    type: 'Follow'
};

export type CommentNotification = {
    userId: number,
    date: Date,
    type: 'Comment'
};

export type Notification =
    | LikeNotification
    | PostNotification
    | FollowNotification
    | CommentNotification;
