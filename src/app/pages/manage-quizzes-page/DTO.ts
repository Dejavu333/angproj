export class QuizDTO {
    public title: string;
    public columnNameItBelongsTo: string;
    public indexInColumn: number;
    public quizQuestions: QuizQuestionDTO[];
    public isOrdered: boolean;
    public timeLimit: number;

    constructor(columnNameItBelongsTo:string="", indexInColumn:number=-1, title:string="<<question>>", quizQuestions:QuizQuestionDTO[] = [], isOrdered:boolean=false, timeLimit:number=0) {
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

    constructor(questionText:string="<<question>>", options:string[]=["<<option>>", "<<option>>"], answerIndecies:number[]=[], isOrdered:boolean=false) {
        this.questionText = questionText;
        this.options = options;
        this.answerIndecies = answerIndecies;
        this.isOrdered = isOrdered;
    }
}
