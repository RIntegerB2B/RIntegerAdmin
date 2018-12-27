import { VideoCategory } from './video-portfolio.model';


export class VideoMainCat {
    _id: string;
    mainCategoryName: string;
    category: VideoCategory;
    constructor(
        _id: string,
        mainCategoryName: string,


    ) {
        this._id = _id;
        this.mainCategoryName = mainCategoryName;

    }
}