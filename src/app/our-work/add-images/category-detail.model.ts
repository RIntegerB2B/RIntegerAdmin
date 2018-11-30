import { MainCatOnSub } from './main-category.model';
export class MainCatDetail {
    _id: string;
    categoryName: string;
    mainCategory: MainCatOnSub;
    constructor(
        _id: string,
        categoryName: string,
        mainCategory: MainCatOnSub
    ) {
        this._id = _id;
        this.categoryName = categoryName;
        this.mainCategory = mainCategory;

    }
}
