export class QuizQuestionDTO {
    public questionText: string;
    public options: string[];
    public answerIndecies: number[];
    public isOrdered: boolean;

    constructor(questionText: string = "<<question>>", options: string[] = ["<<option>>", "<<option>>"], answerIndecies: number[] = [], isOrdered: boolean = false) {
        this.questionText = questionText;
        this.options = options;
        this.answerIndecies = answerIndecies;
        this.isOrdered = isOrdered;
    }
}
