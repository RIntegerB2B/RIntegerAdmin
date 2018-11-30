export class MainCategoryDetail {
    mainId: Number;
    categoryName: string;
    categoryDescription: string;
    mainCategoryName: string;
    mainCategoryDescription: string;
    constructor(
        mainId: Number,
        categoryName: string,
        categoryDescription: string,
        mainCategoryName: string,
        mainCategoryDescription: string
       ) {
        this.mainId = mainId;
        this.categoryName = categoryName;
        this.mainCategoryName = mainCategoryName;
        this.mainCategoryDescription = mainCategoryDescription;
    }
}
