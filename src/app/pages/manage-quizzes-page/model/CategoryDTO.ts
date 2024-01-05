export class CategoryDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public indexOnPage: number;
    public categoryName: string;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(categoryName: string, indexOnPage: number = -1) {
        this.indexOnPage = indexOnPage;
        this.categoryName = categoryName;
    }
}
