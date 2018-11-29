import { Category } from './category.model';


export class MainCatOnSub {
    _id: string;
    mainCategoryName: string;
    category: Category;
    constructor(
        _id: string,
        mainCategoryName: string,


    ) {
        this._id = _id;
        this.mainCategoryName = mainCategoryName;

    }
}