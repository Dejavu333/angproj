import { Group, QuizDTO } from "../model/QuizDTO";
import { QuizQuestionDTO } from "../model/QuizQuestionDTO";

export abstract class QuizEditorTool {
    abstract cursor: string;
    abstract activate(): void;
    abstract clickCommand(el?:any, el2?:any): void;
}

export class GroupingTool extends QuizEditorTool {
    override cursor: string = "pointer";
    groupingColor:string;

    constructor(groupingColor:string) {
        super();
        this.groupingColor = groupingColor;
    }

    override activate(): void {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.setProperty('cursor', this.cursor, 'important');
        });
    }

    override clickCommand(el?:QuizQuestionDTO, el2?:QuizDTO): void {
        const g = new Group(this.groupingColor,Math.max());
        el && el2?.setGroupForQuizQuestion(el,g);   //doesnt work since passes a copy or IDK
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

