import { QuizQuestionDTO } from "./QuizQuestionDTO";

export class QuizDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public title: string;
    public category: string;
    public indexInColumn: number;
    public quizQuestions: QuizQuestionDTO[];
    public isOrdered: boolean;
    public timeLimit: number;
    private animState: "" | "fade-out" | "scale-in" | "fly-in";
    
    //===========================================================================
    // constructors
    //===========================================================================
    constructor(category: string, indexInColumn: number = -1, title: string = "<< new quiz >>", quizQuestions: QuizQuestionDTO[] = [], isOrdered: boolean = false, timeLimit: number = 0) {
        this.category = category;
        this.indexInColumn = indexInColumn;
        this.title = title;
        this.quizQuestions = quizQuestions;
        this.isOrdered = isOrdered;
        this.timeLimit = timeLimit;

        this.animState = "scale-in";
    }

    //===========================================================================
    // methods
    //===========================================================================
    setAnimState(toState: "" | "fade-out" | "scale-in" | "fly-in") {
        this.animState = toState;
    }
    getAnimState() {
        return this.animState;
    }
}
