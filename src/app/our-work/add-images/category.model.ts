export class Category {
    _id: string;
    categoryName: string;
    categoryPosition: Number;
    primeImage: string;
    images: [string];
    constructor(
        categoryName: string,
        categoryPosition: Number,
        primeImage: string
    ) {
        this.categoryName = categoryName;
        this.categoryPosition = categoryPosition;
        this.primeImage = primeImage;

    }
}