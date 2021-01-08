export type LikeNotification = {
    userId: number,
    date: Date,
    postId: number,
    type: 'Like'
};

export type PostNotification = {
    userId: number,
    date: Date,
    postId: number,
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
    postId: number,
    type: 'Comment'
};

export type Notification =
    | LikeNotification
    | PostNotification
    | FollowNotification
    | CommentNotification;
