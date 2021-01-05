export type LikeNotification = {
    userId: number,
    postId: number,
    type: 'Like'
}

export type PostNotification = {
    userId: number,
    postId: number,
    type: 'Post'
}

export type FollowNotification = {
    userId: number,
    type: 'Follow'
}

export type CommentNotification = {
    userId: number,
    postId: number,
    type: 'Comment'
}

export type Notification =
    | LikeNotification
    | PostNotification
    | FollowNotification
    | CommentNotification
