import { Group, QuizDTO } from "../model/QuizDTO";
import { QuizQuestionDTO } from "../model/QuizQuestionDTO";

export abstract class QuizEditorTool {
    abstract cursor: string;
    abstract activate(): void;
    abstract clickCommand(target?:any): void;
}

export class GroupingTool extends QuizEditorTool {
    override cursor: string = "pointer";
    groupingColor:string;
    currentlyEditedQuiz: QuizDTO;

    constructor(groupingColor:string, currentlyEditedQuiz: QuizDTO) {
        super();
        this.groupingColor = groupingColor;
        this.currentlyEditedQuiz= currentlyEditedQuiz;
    }

    override activate(): void {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.setProperty('cursor', this.cursor, 'important');
        });
    }

    override clickCommand(target:HTMLElement): void {
        if (target.classList.contains("question")) {
            const targetQuestion:QuizQuestionDTO = this.currentlyEditedQuiz.quizQuestions[Number(target.id)];
            const g = new Group(this.groupingColor,Math.max());
            this.currentlyEditedQuiz.setGroupForQuizQuestion(targetQuestion,g);
        }
    }
}

export class DefaultTool extends QuizEditorTool {
    override cursor: string = "auto";

    override activate(): void {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.setProperty('cursor', this.cursor, 'important');
        });
    }

    override clickCommand(): void {
        console.log("nothing happens since its default tool");
    }
}

