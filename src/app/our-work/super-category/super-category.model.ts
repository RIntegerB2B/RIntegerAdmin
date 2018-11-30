export class SuperCategory {
    _id: string;
    categoryName: string;
    editing: boolean;
    constructor(
        categoryName: string,
    ) {
        this.categoryName = categoryName;
    }
}
