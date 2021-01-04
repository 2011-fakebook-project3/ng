export interface Notification {
    // covers all cases of notifications, postId will be left undefined
    // in the case of a follow, where userId is the person following/unfollowing
    // the four cases covered by type are: "Like", "Comment", "Post", "Follow"
    userId: number;
    postId: number | undefined;
    type: string;
}
