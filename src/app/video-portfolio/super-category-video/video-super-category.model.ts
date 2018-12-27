export class VideoSuperCategory {
    _id: string;
    categoryName: string;
    editing: boolean;
    constructor(
        categoryName: string,
    ) {
        this.categoryName = categoryName;
    }
}
