export class QuizOptionDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public optionText: string;
    public indexInParent: number;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(optionText: string, indexInParent: number) {
        this.optionText = optionText;
        this.indexInParent = indexInParent;
    }
}