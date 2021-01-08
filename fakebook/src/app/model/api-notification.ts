export type PostType = {
    Key: 'Like'| 'Post' | 'Follow' | 'Comment'
    Value: number
};

export type ApiNotification = {
    Id: number,
    Type: PostType,
    LoggedInUserId: number,
    TriggerUserId: number,
    HasBennread: boolean,
    Date: Date
};
