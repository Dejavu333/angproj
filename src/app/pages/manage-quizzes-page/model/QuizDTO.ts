import { QuizAnimState } from "app/app.animations";
import { QuizQuestionDTO } from "./QuizQuestionDTO";
import { Constants } from "app/app.constants";

export class QuizDTO {
    //===========================================================================
    // properties, fields
    //===========================================================================
    public title: string;
    public category: string;
    public indexInParent: number;
    public quizQuestions: QuizQuestionDTO[];
    public isOrdered: boolean;
    public timeLimit: number;
    private animState: QuizAnimState;

    //===========================================================================
    // constructors
    //===========================================================================
    constructor(category: string, indexInParent: number = -1, title: string = Constants.DEFAULT_QUIZ_NAME, quizQuestions: QuizQuestionDTO[] = [], isOrdered: boolean = false, timeLimit: number = 0) {
        this.category = category;
        this.indexInParent = indexInParent;
        this.title = title;
        this.quizQuestions = quizQuestions;
        this.isOrdered = isOrdered;
        this.timeLimit = timeLimit;

        this.animState = QuizAnimState.ScaleIn;
    }

    //===========================================================================
    // methods
    //===========================================================================
    setAnimState(toState: QuizAnimState) {
        this.animState = toState;
    }
    getAnimState() {
        return this.animState;
    }
}
