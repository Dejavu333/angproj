export class QuizDTO {
    public title: string;
    public columnNameItBelongsTo: string;
    public indexInColumn: number;
    public quizQuestions: QuizQuestionDTO[];
    public isOrdered: boolean;
    public timeLimit: number;

    constructor(columnNameItBelongsTo="", indexInColumn=-1, title="<<question>>", quizQuestions=[], isOrdered=false, timeLimit=0) {
        this.title = title;
        this.indexInColumn = indexInColumn;
        this.columnNameItBelongsTo = columnNameItBelongsTo;
        this.quizQuestions = quizQuestions;
        this.isOrdered = isOrdered;
        this.timeLimit = timeLimit;
    }
}

export class QuizQuestionDTO {
    public questionText: string;
    public options: string[];
    public answerIndecies: number[];
    public isOrdered: boolean;

    constructor(questionText="<<question>>", options=["<<option>>", "<<option>>"], answerIndecies=[], isOrdered=false) {
        this.questionText = questionText;
        this.options = options;
        this.answerIndecies = answerIndecies;
        this.isOrdered = isOrdered;
    }
}
