export class VideoDetails {
    displayClass: string;
    supercategory: string;
    supercategoryname: string;
    maincategory: string;
    maincategoryname: string;
    category: string;
    categoryname: string;
    constructor(displayClass: string,
        supercategory: string,
        maincategory: string,
        category: string/* ,
        supercategoryname: string,
        maincategoryname: string,
        categoryname: string */
    ) {
        this.displayClass = displayClass;
        this.maincategory =  maincategory;
        this.supercategory = supercategory;
        this.category = category;
       /*  this.supercategoryname = supercategoryname;
        this.maincategoryname = maincategoryname;
        this.categoryname = categoryname; */
    }
}