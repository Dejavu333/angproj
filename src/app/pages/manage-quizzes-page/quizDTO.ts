import { QuizQuestionDTO } from "./quizQuestionDTO";

export class QuizDTO {
    public title: string;
    public category: string;
    public indexInColumn: number;
    public quizQuestions: QuizQuestionDTO[];
    public isOrdered: boolean;
    public timeLimit: number;

    constructor(category: string = "", indexInColumn: number = -1, title: string = "<<question>>", quizQuestions: QuizQuestionDTO[] = [], isOrdered: boolean = false, timeLimit: number = 0) {
        this.title = title;
        this.indexInColumn = indexInColumn;
        this.category = category;
        this.quizQuestions = quizQuestions;
        this.isOrdered = isOrdered;
        this.timeLimit = timeLimit;
    }
}
