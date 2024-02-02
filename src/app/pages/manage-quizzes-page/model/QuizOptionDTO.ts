export class QuizOptionDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public id:string;
    public optionText: string;
    public indexInParent: number;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(id:string, optionText: string, indexInParent: number) {
        this.id = id;
        this.optionText = optionText;
        this.indexInParent = indexInParent;
    }
}