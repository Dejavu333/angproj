export class CategoryDTO {
    public indexOnPage: number;
    public categoryName: string;

    constructor(categoryName: string, indexOnPage: number = -1) {
        this.indexOnPage = indexOnPage;
        this.categoryName = categoryName;
    }
}
