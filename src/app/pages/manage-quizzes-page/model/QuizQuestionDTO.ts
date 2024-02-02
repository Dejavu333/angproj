import { QuizOptionDTO } from "./QuizOptionDTO";

export class QuizQuestionDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public questionText: string;
    public options: QuizOptionDTO[];
    public answerIndecies: number[];
    public optionsAreOrdered: boolean;
    public indexInParent: number;
    public score: number;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(questionText: string, options: QuizOptionDTO[], answerIndecies: number[], optionsAreOrdered: boolean, indexInParent: number, score: number) {
        this.questionText = questionText;
        this.options = options;
        this.optionsAreOrdered = optionsAreOrdered;
        this.answerIndecies = answerIndecies;
        this.indexInParent = indexInParent;
        this.score = score;
    }
}
export { QuizOptionDTO };

