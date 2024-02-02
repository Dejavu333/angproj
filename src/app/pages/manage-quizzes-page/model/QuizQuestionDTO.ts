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
    public group: string;
    public isSubpoints: boolean;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(questionText: string, options: QuizOptionDTO[], answerIndecies: number[], optionsAreOrdered: boolean, indexInParent: number, score: number, group:string, isSubpoints: boolean) {
        this.questionText = questionText;
        this.options = options;
        this.optionsAreOrdered = optionsAreOrdered;
        this.answerIndecies = answerIndecies;
        this.indexInParent = indexInParent;
        this.score = score;
        this.group = group;
        this.isSubpoints = isSubpoints;
    }
}