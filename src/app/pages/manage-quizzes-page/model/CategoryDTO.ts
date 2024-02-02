export class CategoryDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public indexInParent: number;
    public categoryName: string;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(categoryName: string, indexInParent: number = -1) {
        this.indexInParent = indexInParent;
        this.categoryName = categoryName;
    }
}
