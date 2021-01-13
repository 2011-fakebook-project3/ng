export class NewPost {
    constructor(
    public content: string,
    public userId: string | undefined,
    public pictureUrl: string | undefined
    ) {}
}
