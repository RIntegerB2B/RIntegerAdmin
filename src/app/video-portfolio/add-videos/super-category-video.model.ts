

import { VideoMainCat } from './main-category-video.model';
export class MainCatDetail {
    _id: string;
    categoryName: string;
    mainCategory: VideoMainCat;
    constructor(
        _id: string,
        categoryName: string,
        mainCategory: VideoMainCat
    ) {
        this._id = _id;
        this.categoryName = categoryName;
        this.mainCategory = mainCategory;

    }
}